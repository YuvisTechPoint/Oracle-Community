# 🏛️ Oracle Kolkata Community

The official website for the **Oracle Kolkata Community** — a free, open community for students, developers, architects, DBAs, and IT professionals to connect, collaborate, and create together.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

---

## 🌐 Live Demo

Coming soon...

---

## 📸 Features

- **Hero Section** — Immersive landing with 3D keyboard visuals and animated typography
- **Community Area** — Showcase of community stats and partner logos
- **Course Section** — Interactive course cards with enrollment details
- **Mission Page** — Community mission and vision with scroll animations
- **Team Section** — Meet the team with detailed member profiles
- **Contact Form** — Send messages directly to our Google Spreadsheet
- **Login Modal** — Register your contact details (Name, Email, Phone) saved to Google Sheets in real-time
- **Google Sheets Integration** — All form submissions (login & contact) are stored in a shared Google Spreadsheet

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite 8, TailwindCSS 4 |
| **3D Graphics** | Three.js, React Three Fiber, React Three Drei |
| **Animations** | Motion (Framer Motion), React Simple Typewriter |
| **UI Components** | Radix UI, Lucide React, shadcn/ui |
| **Backend** | Node.js, Express |
| **Database** | Google Sheets API (via Google Apps Script) |
| **Styling** | TailwindCSS, CVA (Class Variance Authority) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **npm** v9+ installed
- A **Google account** for Sheets integration

### Installation

```bash
# Clone the repository
git clone https://github.com/YuvisTechPoint/Oracle-Community.git
cd Oracle-Community

# Install dependencies
npm install
```

### Run the Development Server

```bash
# Terminal 1 — Start the frontend
npm run dev

# Terminal 2 — Start the backend server
npm run server
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
npm run build
```

---

## 📊 Google Sheets Integration Setup

All user data (login & contact form) is saved directly to a Google Spreadsheet in real-time.

### Step 1: Deploy Google Apps Script

1. Open the target Google Spreadsheet
2. Click **Extensions → Apps Script**
3. Copy the code from [`google-script-ready-to-deploy.txt`](./google-script-ready-to-deploy.txt) and paste it
4. Click **Save** (💾 icon)
5. Click **Deploy → New deployment**
6. Select type: **Web app**
7. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
8. Click **Deploy** → **Authorize** → **Allow**
9. **Copy the Web App URL**

### Step 2: Add the URL to Frontend

Replace `PASTE_URL_HERE` in these files with your Web App URL:

- `src/Components/LoginModal.jsx` (line 25)
- `src/Components/Contactus.jsx` (line 27)

### Spreadsheet Columns

| Timestamp | Name | Email | Phone | Type | Subject | Message |
|-----------|------|-------|-------|------|---------|---------|

The **Type** column indicates the source: `login` or `contact`.

---

## 📁 Project Structure

```
Oracle-Kolkata-Community/
├── public/                     # Static assets (3D models, textures, logos)
├── src/
│   ├── Components/
│   │   ├── About.jsx           # About section
│   │   ├── CommunityArea.jsx   # Community showcase
│   │   ├── Contactus.jsx       # Contact form (→ Google Sheets)
│   │   ├── Course_section.jsx  # Course listings
│   │   ├── Crausal.jsx         # Carousel/slider
│   │   ├── Hero.jsx            # Hero landing section
│   │   ├── LoginModal.jsx      # Login modal (→ Google Sheets)
│   │   ├── MissionPage.jsx     # Mission & vision
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── TeamDetail.jsx      # Team member profiles
│   │   ├── Togglebutton.jsx    # Toggle component
│   │   └── footer.jsx          # Footer section
│   ├── Details/                # Data files (team, carousel)
│   ├── assets/                 # Images, SVGs, videos
│   ├── lib/                    # Utility functions
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── server.js                   # Express backend server
├── google-script-ready-to-deploy.txt  # Apps Script code
├── .env.example                # Environment variable template
├── package.json
├── vite.config.js
└── README.md
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend) |
| `npm run server` | Start Express backend server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👥 Community

Membership is **free and open** to everyone — students, developers, architects, DBAs, and managers. Join us and be part of the Oracle Kolkata Community!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by the <strong>Oracle Kolkata Community</strong> team
</p>
