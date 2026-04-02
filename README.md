# AI Tour Planner

An intelligent, calendar-based travel planning web app that helps users discover long weekends, public holidays, and bridge days — then generates detailed, AI-powered itineraries tailored to their preferences. Integrates Apify MCP server to enrich travel itineraries with real hotel, restaurant, and attraction data from TripAdvisor based on the user's destination. Leverages Supabase for caching to deliver instant results on repeat searches.

---

## Features

### Calendar & Holiday Intelligence
- **Public Holiday Detection** — Fetches real public holidays for 100+ countries via the Nager.Date API
- **Extended Weekend Finder** — Automatically highlights 3-day weekends when holidays fall on Friday or Monday
- **Bridge Day Suggestions** — Detects opportunities where taking 1-2 leaves creates mega-weekends (e.g., Thursday holiday + Friday leave = 4-day trip)
- **Major Festival Handling** — Special logic for festivals like Diwali, Holi, Christmas, Eid, etc., where mid-week holidays justify taking multiple leaves
- **Past Date Blocking** — Users can view past long weekends but cannot plan trips for dates that have passed

### AI-Powered Destination Suggestions
- Suggests **7 to 10 personalized destinations** based on:
  - Vacation type (beaches, mountains, adventure, heritage, wildlife, etc.)
  - Starting city
  - Preferred transport (train, flight, road, bus)
  - Trip duration
  - Travel month & season
- Each suggestion includes highlights, travel time estimates, seasonal tips, and packing recommendations

### Detailed Itinerary Generation
- **Hour-by-hour itineraries** covering the full trip — from departure to return
- Incorporates real hotel, restaurant, and attraction data from **TripAdvisor**
- Smart departure time planning with 4 slots:
  - Morning (6 AM – 10 AM)
  - Afternoon (1 PM – 5 PM)
  - Evening (6 PM – 9 PM)
  - Late Night (10 PM – 4 AM)
- AI determines realistic travel routes and timings based on transport mode
- Generates meal plans, check-in/check-out times, activity schedules, and overnight stays
- **PDF Download** — Export your full itinerary as a downloadable PDF

### Caching Layer
- All AI-generated destinations and itineraries are cached in **Supabase**
- Repeat queries are served instantly without additional API calls
- Cache keys factor in destination, origin city, transport, duration, and departure slot

### Wishlist
- Save destinations to a personal wishlist for later planning
- Persistent within the session

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS v3 |
| **Fonts** | Cormorant Garamond (display) + DM Sans (body) |
| **AI Engine** | Groq Inference API (`openai/gpt-oss-120b`) |
| **Place Data** | TripAdvisor via Apify |
| **Holiday API** | [Nager.Date](https://date.nager.at/) |
| **Database/Cache** | Supabase (PostgreSQL + REST API) |
| **PDF Export** | Browser-native generation |

---

## Project Structure

```
ai-tour-planner/
├── src/
│   ├── components/
│   │   ├── Calendar.jsx          # Calendar grid with holiday highlighting
│   │   ├── Header.jsx            # App header with country selector
│   │   ├── Legend.jsx             # Color legend for calendar
│   │   ├── PlanningModal.jsx      # 4-step planning flow + itinerary display
│   │   └── WishlistSidebar.jsx    # Saved destinations sidebar
│   ├── data/
│   │   ├── appData.js             # Country list, vacation types, destinations
│   │   └── detailedItineraries.js # Local fallback itinerary templates
│   ├── hooks/
│   │   └── useHolidays.js         # Holiday fetching & processing hook
│   ├── services/
│   │   ├── grokService.js         # AI destination suggestion service
│   │   ├── itineraryService.js    # AI itinerary generation + caching
│   │   └── tripAdvisorService.js  # TripAdvisor data fetching
│   ├── utils/
│   │   └── holidayUtils.js        # Extended weekend & bridge day algorithms
│   ├── App.jsx                    # Root component
│   ├── index.css                  # Global styles & CSS variables
│   └── main.jsx                   # Entry point
├── .env                           # API keys (not committed)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/asthir001/AI-Travel-Planner.git
cd AI-Travel-Planner
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_APIFY_TOKEN=your_apify_token
```

| Variable | Purpose | Get it from |
|----------|---------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL | [supabase.com](https://supabase.com) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase project settings → API |
| `VITE_GROQ_API_KEY` | AI inference API key | [console.groq.com](https://console.groq.com) |
| `VITE_APIFY_TOKEN` | TripAdvisor data access | [apify.com](https://apify.com) |

### Supabase Tables

Create these tables in your Supabase project:

```sql
-- Itinerary cache
CREATE TABLE itinerary_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT UNIQUE NOT NULL,
  destination TEXT,
  from_city TEXT,
  transport TEXT,
  duration INTEGER,
  itinerary_data JSONB,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Destination suggestion cache
CREATE TABLE destination_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT UNIQUE NOT NULL,
  suggestions JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## How It Works

```
1. User selects country → Calendar loads public holidays
2. User clicks a highlighted long weekend → Planning modal opens
3. Step 1: Choose vacation type (beaches, mountains, adventure, etc.)
4. Step 2: Enter starting city & preferred transport
5. Step 3: Choose group size
6. Step 4: AI suggests 5 destinations → User picks one
7. User clicks "View Detailed Itinerary" → Departure time popup
8. System fetches TripAdvisor data → Feeds it to AI → Generates full itinerary
9. User views day-by-day, hour-by-hour plan → Downloads as PDF
```

---

## Console Logging

The app includes color-coded console logging (visible in browser DevTools) for debugging:

| Color | Level | Purpose |
|-------|-------|---------|
| Indigo | Request | API calls being made |
| Green | Success | Successful responses |
| Amber | Warning | Non-critical issues |
| Red | Error | Failures |
| Blue | Info | General flow information |
| Purple | Cache | Cache hits/misses |
| Pink | AI | AI engine activity |

---

## License

This project is for personal and educational use.
