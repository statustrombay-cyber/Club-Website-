<?php
/** Delivery only: the browser still runs all JavaScript, WASM and WebGL. */
declare(strict_types=1);

function mt_scene_asset_handle(): void
{
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
    if (!in_array($method, ['GET', 'HEAD'], true)) {
        mt_json_raw(405, 'Method not allowed.', ['Allow' => 'GET, HEAD', 'Content-Type' => 'text/plain; charset=utf-8']);
    }
    $id = $_GET['asset'] ?? '';
    $manifest = require MT_APP . '/scene-manifest.php';
    if (!is_string($id) || !isset($manifest[$id])) {
        mt_json_raw(404, 'Unknown scene asset.', ['Content-Type' => 'text/plain; charset=utf-8']);
    }
    $entry = $manifest[$id];
    $body = '';
    foreach ($entry['chunks'] as $name) {
        $path = MT_APP . '/scene-payloads/' . $name;
        if (!is_file($path) || !is_readable($path)) {
            mt_json_raw(503, 'Scene upload is incomplete: ' . $id, ['Content-Type' => 'text/plain; charset=utf-8']);
        }
        $encoded = require $path;
        $part = is_string($encoded) ? base64_decode($encoded, true) : false;
        if ($part === false) {
            mt_json_raw(503, 'Scene upload is damaged: ' . $id, ['Content-Type' => 'text/plain; charset=utf-8']);
        }
        $body .= $part;
    }
    if (strlen($body) !== $entry['bytes'] || !hash_equals($entry['sha256'], hash('sha256', $body))) {
        mt_json_raw(503, 'Scene upload failed its integrity check: ' . $id, ['Content-Type' => 'text/plain; charset=utf-8']);
    }
    $etag = '"' . $entry['sha256'] . '"';
    $headers = [
        'Content-Type' => $entry['type'],
        'X-Content-Type-Options' => 'nosniff',
        'Cache-Control' => 'public, max-age=0, must-revalidate',
        'ETag' => $etag,
        'X-Scene-Asset-Bytes' => (string) $entry['bytes'],
        'X-Scene-Asset-SHA256' => $entry['sha256'],
    ];
    if (trim((string) ($_SERVER['HTTP_IF_NONE_MATCH'] ?? '')) === $etag) {
        mt_json_raw(304, '', $headers);
    }
    $headers['Content-Length'] = (string) $entry['bytes'];
    mt_json_raw(200, $method === 'HEAD' ? '' : $body, $headers);
}
