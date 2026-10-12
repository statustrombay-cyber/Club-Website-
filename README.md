# Mindful Tattva

A polished, mobile-friendly psychology club website for **Mindful Tattva**, the psychology club under the **Department of Applied Social Science** at Chhatrapati Shivaji Maharaj University.

## Run it

```bash
npm start
```

Then open:

- Public website: `http://localhost:4173/`
- Content Studio: `http://localhost:4173/admin.html`

The server binds to `0.0.0.0` so it also works in the live preview environment.

## What is included

- Warm editorial public website with sections for About, Psychology Lens, Club Details, History, Events, Calendar, Event Gallery, Core Team, Join and Contact.
- Current-events banner that stays at “No new events are scheduled” until an admin publishes an event.
- Year-round calendar with event date, time and location fields.
- Editable site copy, detailed club information, university details, Instagram, email, club phone and homepage stats.
- Editable history timeline, event cards, event publishing status, gallery photos and core team profiles.
- Clickable member phone numbers, address/Google Maps link and Instagram links.
- Membership / Join the Club form and Club/Event Registration form.
- Password-protected Content Studio with a Form Submissions inbox.
- JSON backend persisted in `data/site.json`.
- Server-sent live updates: saved Content Studio changes appear on open public pages without a manual refresh.
- Public and admin styles/scripts are embedded for reliable Arena preview rendering.

## Adding the club assets later

Open **Content Studio** and add:

1. Official logo or initials in the Brand & Story section.
2. Core team names, roles, bios, phone numbers and portraits.
3. Event details and event cover images.
4. Gallery photos and captions.
5. The live Instagram profile URL.

The current Content Studio password is the one configured for this handoff. For a production launch, move the password to a deployment secret and add a proper user/session store before exposing the site publicly.

## University address used

The address currently shown in the website is the exact wording from the university's official Contact page:

> Near Shedung Toll Plaza, Old Mumbai-Pune Highway, Panvel, Navi Mumbai, Maharashtra Pincode – 410206.

Source: https://csmu.ac.in/contact-us/
