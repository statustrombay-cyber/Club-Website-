<?php
/**
 * Mindful Tattva · local settings
 * -------------------------------
 * The club password lives here as a bcrypt hash. You can change it from the
 * dashboard (Backups & settings → Change the club password), which rewrites
 * this file with a fresh hash.
 *
 * Keep this file out of version control on a live server.
 */

return [
    // Current club password: Csmu@MT
    'admin_password_hash' => '$2y$12$1BYn7qhQIEijcK9g/fIL/ey2BCHz8Ahd1oGxfFRQplk0yjV0gy9om',

    // Uploads: 4 MB (JPEG/PNG/WEBP/GIF photos and PDFs only).
    'max_upload_bytes' => 4 * 1024 * 1024,
];
