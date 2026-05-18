Deployment - Hostinger (automatic)
=================================

This project can auto-deploy to Hostinger when you push to the `main` or `master` branch using GitHub Actions.

1) Create a GitHub repository and push this project.

2) Add the following repository Secrets (Settings → Secrets → Actions):
- `HOSTINGER_HOST` — your Hostinger FTP host (e.g. `ftp.yourdomain.tld`)
- `HOSTINGER_USER` — your FTP username
- `HOSTINGER_PASSWORD` — your FTP password
- `HOSTINGER_REMOTE_DIR` — remote path where files should be uploaded (commonly `/public_html`)

3) The workflow `.github/workflows/deploy-hostinger.yml` will run on each push and sync the repository files to the remote directory.

Notes & security
- Prefer creating an FTP account limited to the site folder.
- Consider using SFTP if your Hostinger plan supports it; you can modify the workflow `protocol` and `port` accordingly.
- If you want zero-downtime or build steps, update the workflow to run a build and upload only the build output directory.
