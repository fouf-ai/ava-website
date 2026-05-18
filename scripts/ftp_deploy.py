import ftplib
import os
import sys
from pathlib import Path


class FixedPassiveFTP(ftplib.FTP):
    """Force data connections to use the server's public IP instead of
    the private NAT address returned in the PASV response.
    This fixes 'max-retries exceeded' and data-connection timeouts on
    shared hosting behind NAT (Hostinger, cPanel, etc.)."""
    def makepasv(self):
        _, port = super().makepasv()
        return self.host, port   # use control-connection host, not PASV IP


host     = os.environ['FTP_HOST']
user     = os.environ['FTP_USER']
password = os.environ['FTP_PASS']
base     = os.environ['FTP_DIR'].strip('/')

SKIP = {'.git', '.github', 'scripts'}

print(f"Connecting to {host}...")
ftp = FixedPassiveFTP()
ftp.connect(host, 21, timeout=60)
ftp.login(user, password)
ftp.set_pasv(True)
print("Connected and logged in.")

made = set()

def mkdirs(path):
    parts = [p for p in path.split('/') if p]
    for i in range(1, len(parts) + 1):
        d = '/'.join(parts[:i])
        if d not in made:
            try:
                ftp.mkd(d)
            except ftplib.error_perm:
                pass
            made.add(d)

mkdirs(base)

ok, fail = 0, []

for f in sorted(Path('.').rglob('*')):
    if f.is_dir():
        continue
    if any(p in SKIP for p in f.parts):
        continue
    rel = str(f.relative_to('.')).replace('\\', '/')
    if rel.startswith('.'):
        continue
    remote = f"{base}/{rel}"
    mkdirs(remote.rsplit('/', 1)[0])
    try:
        with open(f, 'rb') as fh:
            ftp.storbinary(f'STOR {remote}', fh)
        print(f"  OK  {rel}")
        ok += 1
    except Exception as e:
        print(f"  ERR {rel}: {e}", file=sys.stderr)
        fail.append(rel)

ftp.quit()
print(f"\nResult: {ok} uploaded, {len(fail)} failed")
if fail:
    for fl in fail:
        print(f"  FAILED: {fl}", file=sys.stderr)
    sys.exit(1)
