<?php
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$email = trim($_POST['email'] ?? '');
$lang  = in_array($_POST['lang'] ?? '', ['fr', 'en', 'ar']) ? $_POST['lang'] : 'fr';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    $msg = $lang === 'en' ? 'Invalid email address.' : ($lang === 'ar' ? 'عنوان البريد الإلكتروني غير صالح.' : 'Adresse e-mail invalide.');
    echo json_encode(['ok' => false, 'message' => $msg]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO newsletter_subscribers (email, lang)
         VALUES (:email, :lang)
         ON DUPLICATE KEY UPDATE subscribed_at = subscribed_at"
    );
    $stmt->execute([':email' => $email, ':lang' => $lang]);

    if ($stmt->rowCount() > 0) {
        $msg = $lang === 'en' ? 'Thank you! You are now subscribed.' : ($lang === 'ar' ? 'شكراً! تم اشتراكك بنجاح.' : 'Merci ! Vous êtes bien abonné(e).');
    } else {
        $msg = $lang === 'en' ? 'You are already subscribed. Thank you!' : ($lang === 'ar' ? 'أنت مشترك بالفعل. شكراً!' : 'Vous êtes déjà abonné(e). Merci !');
    }
    echo json_encode(['ok' => true, 'message' => $msg]);

} catch (PDOException $e) {
    error_log('[AVA newsletter] ' . $e->getMessage());
    http_response_code(500);
    $msg = $lang === 'en' ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.';
    echo json_encode(['ok' => false, 'message' => $msg]);
}
