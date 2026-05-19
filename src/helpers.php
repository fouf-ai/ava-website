<?php

function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function getStats(PDO $pdo): array {
    try {
        $rows = $pdo->query("SELECT stat_key, value, label_fr, label_en FROM statistics")->fetchAll();
        $out = [];
        foreach ($rows as $row) {
            $out[$row['stat_key']] = $row;
        }
        return $out;
    } catch (PDOException $e) {
        error_log('[AVA helpers] ' . $e->getMessage());
        return [];
    }
}

function statVal(array $stats, string $key, int $default = 0): int {
    return isset($stats[$key]) ? (int) $stats[$key]['value'] : $default;
}
