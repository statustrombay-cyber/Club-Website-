<?php
/**
 * Mindful Tattva · local settings
 * -------------------------------
 * The club password lives here as a bcrypt hash. You can change it from the
 * club area (Backups & settings → Change the club password), which rewrites
 * this file with a fresh hash.
 *
 * Keep this file out of version control on a live server.
 */

return [
    // The club password as a bcrypt hash — it is never stored or printed in
    // plain text, and it can be changed any time from the club area.
    'admin_password_hash' => '$2y$12$1BYn7qhQIEijcK9g/fIL/ey2BCHz8Ahd1oGxfFRQplk0yjV0gy9om',

    // Photos uploaded from the club area: 4 MB (JPEG/PNG/WEBP/GIF only).
    'max_upload_bytes' => 4 * 1024 * 1024,

    // Payment screenshots sent by students: 2 MB — a screenshot, not a photo.
    'max_proof_bytes' => 2 * 1024 * 1024,

    // Raised every time the club password changes: sessions carrying an older
    // number stop working, so a password change signs other devices out.
    'session_generation' => 1,
];
