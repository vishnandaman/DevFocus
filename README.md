# DevFocus

**Distraction Tracker for Developers**

An open-source productivity tool that helps developers track coding sessions, monitor distracting websites, and calculate a focus score based on browsing activity.

---

## Overview

DevFocus helps you stay accountable by:

- **Tracking** browsing activity during coding sessions  
- **Categorizing** websites as productive, distracting, or neutral  
- **Calculating** a focus score based on where you spend your time  
- **Visualizing** analytics in a dashboard with charts and insights  

---

## Features

| Feature | Description |
|---------|-------------|
| **Session Management** | Start and end coding sessions with a single click |
| **Tab Tracking** | Browser extension monitors active tabs and URL changes |
| **Website Categorization** | Automatic classification (GitHub, Stack Overflow = productive; YouTube, Instagram = distracting) |
| **Focus Score** | `(Productive Time / Total Time) × 100` |
| **Analytics Dashboard** | View session history, pie charts, and recent activity |

---

## System Architecture

```
┌─────────────────────┐
│  Browser Extension  │  Chrome (Manifest v3)
│  Track Tab Activity │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Backend API      │  Node.js + Express
│  Store & Calculate  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Supabase       │  PostgreSQL
│     (Database)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Frontend Dashboard │  React + Tailwind + Chart.js
│  View Analytics     │
└─────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Tailwind CSS, Chart.js, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | Supabase (PostgreSQL) |
| **Extension** | Chrome Extension API (Manifest v3) |

---

## Project Structure

```
DevFocus/
├── backend/              # Express API server
│   ├── server.js
│   ├── config/
│   │   └── supabase.js
│   ├── controllers/
│   │   └── sessionController.js
│   └── routes/
│       └── sessionRoutes.js
│
├── frontend/             # React dashboard
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
│
├── extension/            # Chrome extension
│   ├── manifest.json
│   ├── background.js
│   ├── popup.html
│   └── popup.js
│
├── SETUP_GUIDE.md        # Detailed implementation guide
└── README.md
```

---

## Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Chrome** browser
- **Supabase** account ([supabase.com](https://supabase.com))

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/vishnandaman/DevFocus.git
cd DevFocus
```

### 2. Setup Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL from [SETUP_GUIDE.md](./SETUP_GUIDE.md#step-23--create-database-tables) to create `sessions` and `activities` tables
3. Copy your **Project URL** and **anon key** from Settings → API

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env    # Create .env and add SUPABASE_URL, SUPABASE_ANON_KEY, PORT
node server.js
```

Server runs at `http://localhost:5000`.

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Dashboard runs at `http://localhost:5173` (or your Vite port).

### 5. Chrome Extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension` folder
5. Click **Start Session** in the popup to begin tracking

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/session/start` | Start a new coding session |
| `POST` | `/api/activity` | Track browsing activity |
| `POST` | `/api/session/end` | End session & calculate focus score |
| `GET` | `/api/session/:id` | Get session analytics |
| `GET` | `/api/session/:id/activities` | Get activities for a session |

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#api-reference) for request/response formats.

---

## Website Categories

**Productive:** GitHub, Stack Overflow, MDN, LeetCode, ChatGPT, etc.  
**Distracting:** YouTube, Instagram, Twitter, Netflix, Reddit, etc.  
**Neutral:** Everything else

---

## Focus Score Formula

```
Focus Score = (Productive Time / Total Time) × 100
```

Example: 90 min productive + 30 min distracting → **Score = 75%**

---

## Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** – Step-by-step implementation, database schema, troubleshooting

---

## Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## License

This project is open source. See [LICENSE](./LICENSE) for details.

---

## Acknowledgments

Built with ❤️ for developers who want to stay focused.
