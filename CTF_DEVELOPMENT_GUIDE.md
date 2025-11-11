# CTF Platform - Development Guide

## 📋 সিস্টেম আর্কিটেকচার

### পেজ স্ট্রাকচার

```
/ctf                           → Main CTF Events page
  ├── [slug]                   → Individual CTF Event details page
  └── /challenges              → Challenges page

/dashboard                      → Dashboard with tabs
  ├── Product Settings         → Product configuration
  ├── User Settings            → User configuration
  ├── Security Settings        → Security settings
  ├── CTF Events              → CTF Events tab
  └── Challenges              → Challenges tab
```

### ডেটা ম্যানেজমেন্ট

সকল CTF এবং Challenge ডেটা `src/data/ctf-data.json` ফাইল থেকে manage করা হয়।

#### JSON Structure

```json
{
  "events": [
    {
      "id": 1,
      "slug": "event-slug",        // URL এর জন্য ব্যবহৃত হয়
      "title": "Event Title",
      "subtitle": "Event Subtitle",
      "date": "Date Range",
      "image": "Image URL",
      "badge": "Live/Upcoming",
      "tags": ["TAG1", "TAG2"],
      "players": 1000,
      "description": "Event description",
      "format": "Jeopardy/Attack-Defense",
      "teamSize": "1-5 people",
      "difficulty": "Difficulty Level",
      "startDate": "01 Jan 2024",
      "startTime": "18:00 GMT",
      "endDate": "31 Dec 2024",
      "endTime": "18:00 GMT",
      "hostedBy": "Organization",
      "hostedByLogo": "Logo URL",
      "going": 1000,
      "teams": 250,
      "playerAvatars": ["URL1", "URL2", ...],
      "type": "Online/Onsite",
      "location": "Location",
      "scenarios": "Number of scenarios"
    }
  ],
  "challenges": [
    {
      "id": 1,
      "title": "Challenge Title",
      "category": "Web/Crypto/Forensics/etc",
      "difficulty": "Easy/Medium/Hard/Impossible",
      "description": "Challenge description",
      "points": 50,
      "solves": 234
    }
  ]
}
```

## 🔧 ডেটা আপডেট করা

### নতুন Event যোগ করা

1. `src/data/ctf-data.json` খুলুন
2. `events` array তে নতুন অবজেক্ট যোগ করুন
3. সকল required fields পূরণ করুন
4. `slug` field টি URL-friendly হতে হবে (e.g., "ctf-try-out")

### নতুন Challenge যোগ করা

1. `src/data/ctf-data.json` খুলুন
2. `challenges` array তে নতুন অবজেক্ট যোগ করুন
3. সকল required fields পূরণ করুন

## 📁 Component Locations

### CTF Components
- `src/components/ctf/ctf-header.tsx` - Main header
- `src/components/ctf/ctf-tabs.tsx` - Event tabs
- `src/components/ctf/ctf-event-card.tsx` - Event card (with link to details)
- `src/components/ctf/ctf-event-grid.tsx` - Events grid
- `src/components/ctf/ctf-detail-header.tsx` - Detail page header
- `src/components/ctf/ctf-detail-info.tsx` - Detail page info
- `src/components/ctf/ctf-detail-about.tsx` - Detail page about
- `src/components/ctf/ctf-detail-sidebar.tsx` - Detail page sidebar
- `src/components/ctf/ctf-detail-footer.tsx` - Detail page footer

### Challenges Components
- `src/components/ctf/challenges-header.tsx` - Challenges header
- `src/components/ctf/challenges-filter.tsx` - Filters
- `src/components/ctf/challenge-card.tsx` - Individual challenge card
- `src/components/ctf/challenges-grid.tsx` - Challenges grid

### Dashboard Components
- `src/components/dashboard/tabs/ctf-events.tsx` - Dashboard CTF events
- `src/components/dashboard/tabs/challenges.tsx` - Dashboard challenges

## 🔗 Navigation

- Event Card → `/ctf/[slug]` (Detail page)
- Challenge Card → `/ctf/challenge/[id]` (Detail page - future)
- Dashboard → Can access both CTF Events and Challenges as tabs

## 🚀 Development Server

```bash
pnpm dev -p 9002
```

## 📦 Build

```bash
pnpm build
```

## ✅ Testing Routes

After running the dev server, you can test:

- `http://localhost:9002/ctf` - Main CTF Events page
- `http://localhost:9002/ctf/ctf-try-out` - CTF Try Out details
- `http://localhost:9002/ctf/mcp-try-out` - MCP Try Out details
- `http://localhost:9002/ctf/challenges` - Challenges page
- `http://localhost:9002/dashboard` - Dashboard with all tabs

## 📝 Notes

- Currently has 2 CTF events and 2 challenges (can be updated in JSON)
- All data is centralized in `ctf-data.json` for easy management
- Components are reusable and accept data as props
- Responsive design for mobile, tablet, and desktop
