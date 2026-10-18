<?php
/** Public content recovered from the club history. No student/private records. */
declare(strict_types=1);
function mt_club_content(): array {
    return json_decode(<<<'PUBLIC_CONTENT'
{
  "site": {
    "clubName": "Mindful Tattva",
    "shortName": "MT",
    "logoImage": "/assets/photos/mt-club-logo.jpg",
    "eyebrow": "Psychology Club, Department of Applied Social Science",
    "tagline": "A calmer space to understand the mind.",
    "intro": "Mindful Tattva is a student-led psychology club at Chhatrapati Shivaji Maharaj University, creating room for curiosity, compassionate conversations and the small practices that help us feel more human.",
    "announcement": "A student-led space for reflection, connection & growth",
    "aboutHeading": "We make room for curiosity, care and community.",
    "aboutBody": "Our club brings psychology out of the textbook and into everyday life. Through conversations, workshops, hands-on activities and shared experiences, Mindful Tattva invites students to look inward, connect with others and grow with intention.",
    "clubDescription": "Mindful Tattva is a student-led psychology club under the Department of Applied Social Science at Chhatrapati Shivaji Maharaj University. We create welcoming spaces for students to explore psychology, mental wellbeing, relationships, identity, resilience and the everyday science of being human.",
    "mission": "To make psychology approachable, relevant and rooted in compassion through student-led conversations, workshops, peer learning and community initiatives.",
    "vision": "A campus community where curiosity about the mind becomes empathy in action.",
    "memberBenefits": "Members can participate in workshops, discussion circles, awareness initiatives, hands-on activities, peer learning and future collaborations organised by Mindful Tattva.",
    "joiningIntro": "Join a thoughtful student community and help shape the next chapter of Mindful Tattva.",
    "memberVision": "We imagine Mindful Tattva as a living student space where every member can bring curiosity, care and creativity to the psychology of everyday life.",
    "registrationIntro": "Use this form to register interest in a club activity, workshop or Mindful Tattva initiative. Our team will follow up with the details.",
    "contactNote": "Have an idea, want to collaborate, or simply want to be part of the next circle? We would love to hear from you.",
    "instagramHandle": "@mindful_tattva",
    "instagramUrl": "https://www.instagram.com/mindful_tattva?stkn=MXJqZDhsMGt5cGJmZw==",
    "email": "mindfultattva@csmu.ac.in",
    "clubPhone": "",
    "universityName": "Chhatrapati Shivaji Maharaj University",
    "department": "Department of Applied Social Science",
    "address": "Near Shedung Toll Plaza, Old Mumbai-Pune Highway, Panvel, Navi Mumbai, Maharashtra Pincode – 410206.",
    "universityWebsite": "https://csmu.ac.in/",
    "addressSource": "Official university contact page",
    "stats": [
      {
        "value": "01",
        "label": "shared space"
      },
      {
        "value": "∞",
        "label": "ways to grow"
      },
      {
        "value": "100%",
        "label": "student-led"
      }
    ],
    "galleryHeading": "Small moments. Big meaning.",
    "galleryIntro": "Photos from your events will turn this space into a living scrapbook of the club."
  },
  "history": [
    {
      "id": "history-1",
      "year": "The beginning",
      "title": "A small idea with a big heart",
      "body": "Mindful Tattva began as a belief that conversations about the mind can be thoughtful, accessible and deeply human. This is where the club's story begins."
    },
    {
      "id": "history-2",
      "year": "Our why",
      "title": "Psychology beyond the classroom",
      "body": "We are building a student space where theory meets lived experience—through workshops, peer conversations, shared expression and moments of pause."
    },
    {
      "id": "history-3",
      "year": "Next chapter",
      "title": "Growing together, gently",
      "body": "As our community grows, the stories, people and milestones that shape Mindful Tattva will be added here."
    }
  ],
  "team": [
    {
      "id": "team-tanisha",
      "name": "Tanisha",
      "role": "President",
      "group": "management",
      "groupLabel": "Core Committee",
      "bio": "Leading Mindful Tattva with curiosity, care and a belief in meaningful student-led spaces.",
      "phone": "+91 70460 75606",
      "image": "",
      "showOnHome": true
    },
    {
      "id": "team-mohd-shafiq",
      "name": "Mohd Shafiq",
      "role": "Vice President",
      "group": "management",
      "groupLabel": "Core Committee",
      "bio": "Helping build a thoughtful, welcoming community for psychology conversations and campus connection.",
      "phone": "+91 8104553395",
      "image": "/assets/photos/team-mohd-shafiq.jpg",
      "showOnHome": true
    }
  ],
  "events": [
    {
      "id": "event-welcome-circle",
      "title": "Mindful Tattva Welcome Circle",
      "kicker": "Club gathering",
      "month": 10,
      "day": 24,
      "year": 2026,
      "time": "4:00 PM",
      "location": "CSMU campus · Seminar Hall",
      "description": "A warm first circle to meet the club, share intentions and begin the new chapter together.",
      "published": true,
      "image": "/assets/photos/mt-club-logo.jpg",
      "fee": 0,
      "upiId": "",
      "upiName": "Mindful Tattva",
      "registrationOpen": true,
      "windowMode": "date",
      "closesAt": "",
      "capacity": 0,
      "brochureUrl": "",
      "number": 1,
      "attachment": "",
      "registrationUrl": "",
      "date": "24 October 2026",
      "openedAt": "2026-10-14T08:12",
      "order": 360863
    }
  ],
  "gallery": [
    {
      "id": "gallery-club-logo-test",
      "image": "/uploads/club-logo-test.jpg",
      "caption": "Mindful Tattva club logo",
      "alt": "Mindful Tattva club logo",
      "visible": true,
      "order": 1,
      "eventId": "",
      "event": "",
      "date": ""
    }
  ]
}
PUBLIC_CONTENT, true, 512, JSON_THROW_ON_ERROR);
}

/** One-time additive recovery, never a recurring override of dashboard edits. */
function mt_recover_public_content(array $db): array {
    if (($db['settings']['publicContentRecovery'] ?? 0) >= 1) return $db;
    $seed = mt_club_content();
    foreach ($seed['site'] as $key => $value) {
        if (!isset($db['site'][$key]) || (is_string($db['site'][$key]) && trim($db['site'][$key]) === '')) $db['site'][$key] = $value;
    }
    foreach (['history', 'team', 'events', 'gallery'] as $collection) {
        $db[$collection] = is_array($db[$collection] ?? null) ? $db[$collection] : [];
        foreach ($seed[$collection] as $item) {
            $exists = false;
            foreach ($db[$collection] as &$row) {
                if (($row['id'] ?? '') === $item['id'] ||
                    ($collection === 'team' && strcasecmp(trim($row['role'] ?? ''), $item['role']) === 0) ||
                    ($collection === 'events' && strcasecmp(trim($row['title'] ?? ''), $item['title']) === 0) ||
                    ($collection === 'gallery' && in_array($row['image'] ?? '', [$item['image'], '/assets/photos/mt-club-logo.jpg'], true))) {
                    $sameId = ($row['id'] ?? '') === $item['id'];
                    $samePerson = $collection === 'team' && (trim($row['name'] ?? '') === '' || strcasecmp(trim($row['name']), $item['name']) === 0);
                    // Fill blank known public fields, never another leader's
                    // identity or existing booleans such as a hidden draft.
                    if (($collection === 'team' && $samePerson) || ($collection !== 'team' && $sameId)) {
                        foreach ($item as $field => $value) {
                            if ($field === 'id' || !is_string($value)) continue;
                            if (!isset($row[$field]) || (is_string($row[$field]) && trim($row[$field]) === '')) $row[$field] = $value;
                        }
                    }
                    $exists = true; break;
                }
            }
            unset($row);
            if (!$exists) $db[$collection][] = $item;
        }
    }
    $db['settings']['publicContentRecovery'] = 1;
    return $db;
}

/** Serialize the one-time recovery before any request can edit these rows. */
function mt_boot_public_content(): void {
    if ((mt_db()['settings']['publicContentRecovery'] ?? 0) >= 1) return;
    if (!is_dir(MT_DATA)) @mkdir(MT_DATA, 0775, true);
    $lock = @fopen(MT_DATA . '/.store.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) {
        if ($lock) fclose($lock);
        $GLOBALS['MT_DB_CACHE'] = mt_recover_public_content(mt_db(true));
        return;
    }
    try {
        $db = mt_db(true);
        if (($db['settings']['publicContentRecovery'] ?? 0) >= 1) return;
        $recovered = mt_recover_public_content($db);
        // Never overwrite malformed live JSON: keep it available for recovery.
        $valid = !is_file(MT_DB_FILE) || is_array(json_decode((string) @file_get_contents(MT_DB_FILE), true));
        if (!$valid || !mt_db_write($recovered)) $GLOBALS['MT_DB_CACHE'] = $recovered;
    } finally {
        if ($lock) { flock($lock, LOCK_UN); fclose($lock); }
    }
}
