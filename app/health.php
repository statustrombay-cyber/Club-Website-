<?php
/**
 * Mindful Tattva · deployment check
 * ---------------------------------
 * Answers one question in plain words: "is everything the website needs
 * actually on this server?"
 *
 * A half-finished upload used to show up as a mysterious blank page — the
 * stylesheet was simply not there, so the browser rendered raw HTML. Now every
 * file the design needs is listed, checked and reported (see the /health page
 * and the dashboard's server status).
 *
 * @package MindfulTattva
 */

declare(strict_types=1);

/** Every file the design needs, with a plain-language label. */
function mt_health_assets(): array
{
    return [
        'assets/app.css'                     => 'Main stylesheet — colours, type and layout',
        'assets/app.js'                      => 'Main script — motion, awareness rails, photo viewer',
        'assets/dashboard.css'               => 'Dashboard stylesheet',
        'assets/dashboard.js'                => 'Dashboard script',
        'assets/img/favicon.svg'             => 'Browser tab icon',
        'assets/img/csmu-seal.png'           => 'University seal',
        'assets/img/university-logo.png'     => 'University logo',
        'assets/photos/mt-club-logo.jpg'     => 'Club logo',
        'assets/photos/campus.jpg'           => 'Campus photo',
        'assets/photos/team-mohd-shafiq.jpg' => 'Team photo',
        'assets/awareness/tile-1.jpg'        => 'Awareness tile 1',
        'assets/awareness/tile-2.jpg'        => 'Awareness tile 2',
        'assets/awareness/tile-3.jpg'        => 'Awareness tile 3',
        'assets/awareness/tile-4.jpg'        => 'Awareness tile 4',
    ];
}

/** Human-readable file size. */
function mt_health_size(int $bytes): string
{
    if ($bytes < 1024) {
        return $bytes . ' B';
    }
    if ($bytes < 1024 * 1024) {
        return number_format($bytes / 1024) . ' KB';
    }
    return number_format($bytes / (1024 * 1024), 1) . ' MB';
}

/**
 * The full report: which files exist, whether the folders are writable and a
 * couple of counts so a glance is enough to see the site is healthy.
 *
 * @return array{ok: bool, files: array, missing: array, checks: array, counts: array}
 */
function mt_health_report(): array
{
    $files   = [];
    $missing = [];

    foreach (mt_health_assets() as $rel => $label) {
        $abs    = MT_ROOT . '/' . $rel;
        $bytes  = is_file($abs) ? (int) @filesize($abs) : 0;
        $exists = is_file($abs) && $bytes > 0; // an empty file is as good as absent
        $files[] = [
            'path'   => $rel,
            'label'  => $label,
            'exists' => $exists,
            'size'   => mt_health_size($bytes),
        ];
        if (!$exists) {
            $missing[] = $rel;
        }
    }

    $dataWritable    = is_writable(MT_DATA) || is_writable(dirname(MT_DATA));
    $uploadsWritable = is_dir(MT_UPLOADS) ? is_writable(MT_UPLOADS) : is_writable(MT_ROOT);
    $db              = mt_db();
    $config          = mt_config();

    $checks = [
        [
            'label'  => 'Content store (data/site.json)',
            'ok'     => is_file(MT_DB_FILE),
            'detail' => is_file(MT_DB_FILE) ? 'Found' : 'Missing — the project ships with one',
        ],
        [
            'label'  => 'Club password (data/config.php)',
            'ok'     => is_string($config['admin_password_hash'] ?? null) || !empty($config['admin_password']),
            'detail' => is_string($config['admin_password_hash'] ?? null) || !empty($config['admin_password'])
                ? 'Set'
                : 'No password yet — set one from the dashboard',
        ],
        [
            'label'  => 'Content folder writable (data/)',
            'ok'     => $dataWritable,
            'detail' => $dataWritable ? 'Yes — the dashboard can save' : 'No — set permissions to 755',
        ],
        [
            'label'  => 'Uploads folder writable (uploads/)',
            'ok'     => $uploadsWritable,
            'detail' => $uploadsWritable ? 'Yes — photos can be uploaded' : 'No — set permissions to 755',
        ],
        [
            'label'  => 'PHP version',
            'ok'     => version_compare(PHP_VERSION, '8.0.0', '>='),
            'detail' => PHP_VERSION . ' (8.0 or newer is needed)',
        ],
        [
            'label'  => 'JSON extension',
            'ok'     => function_exists('json_encode'),
            'detail' => function_exists('json_encode') ? 'Available' : 'Missing — required',
        ],
        [
            'label'  => 'Image support',
            'ok'     => function_exists('getimagesize'),
            'detail' => function_exists('getimagesize') ? 'Available' : 'Missing — photo uploads need it',
        ],
    ];

    $ok = $missing === [];
    foreach ($checks as $check) {
        if (!$check['ok']) {
            $ok = false;
        }
    }

    return [
        'ok'      => $ok,
        'files'   => $files,
        'missing' => $missing,
        'checks'  => $checks,
        'counts'  => [
            'revision' => (int) ($db['revision'] ?? 1),
            'team'     => count($db['team']),
            'events'   => count($db['events']),
            'photos'   => count($db['gallery']),
            'tiles'    => count($db['awareness']),
            'forms'    => count($db['submissions']),
        ],
    ];
}

/** One short line for the dashboard: "ok" or what is wrong. */
function mt_health_summary(array $report): string
{
    $missing = count($report['missing']);
    if ($missing === 0 && $report['ok']) {
        return 'Every file is in place.';
    }
    if ($missing > 0) {
        return $missing . ($missing === 1 ? ' website file is missing' : ' website files are missing')
            . ' — see the deployment check';
    }
    return 'Some folders need attention — see the deployment check.';
}
