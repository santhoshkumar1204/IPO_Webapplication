<p align="center">
  <img src="public/bluestock_logo.png" alt="Bluestock Fintech Logo" width="200"/>
</p>

<h1 align="center">Bluestock IPO Web Application</h1>

<p align="center">
  <strong>A modern, responsive IPO (Initial Public Offering) tracking and analysis platform built with React</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

**Bluestock IPO** is a sleek, full-featured web application designed to help users track upcoming IPOs, explore stock market insights, and learn technical & fundamental analysis concepts. Built as part of the Bluestock Fintech ecosystem, it offers a beautiful UI with smooth animations, Google OAuth authentication, and a comprehensive dashboard for traders.

---

## Features

- **Landing Page** — Eye-catching hero section with animated SVG trading illustrations, smooth scroll animations, and a professional layout
- **IPO Tracker** — Grid-based display of upcoming IPOs with key details: price band, issue size, open/close dates, listing date, and links to RHP/DRHP documents
- **User Authentication** — Complete auth flow including:
  - Email/Password Sign Up & Sign In
  - Google OAuth Integration
  - reCAPTCHA v2 verification
  - Forgot Password with reset functionality
- **Trading Dashboard** — Interactive dashboard with:
  - Technical Analysis patterns (Triple Bottom, Cup & Handle, Bullish Bat, Ascending Triangle, etc.)
  - Fundamental Analysis insights (Indian Startups, Equity Research, Financial Ratios, etc.)
  - Slide-based content navigation for multi-page topics
- **FAQ Section** — Accordion-style frequently asked questions about IPO investing
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations** — Intersection Observer-based scroll animations, hover effects, and transitions throughout

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Frontend UI library |
| **React Router v7** | Client-side routing |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Axios** | HTTP client for API calls |
| **Chart.js + react-chartjs-2** | Data visualization & charts |
| **Google OAuth** | Social authentication |
| **reCAPTCHA v2** | Bot protection |
| **Create React App** | Build tooling |

---

## Screenshots

### 🏠 Landing Page
> Beautiful hero section with animated trading SVG, navigation bar, and IPO grid

### 🔐 Authentication
> Clean sign-in/sign-up forms with Google OAuth and reCAPTCHA integration

### 📊 Dashboard
> Interactive trading analysis dashboard with Technical & Fundamental analysis cards

### ❓ FAQ Section
> Accordion-style FAQ with smooth expand/collapse animations

---

## Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/santhoshkumar1204/IPO_Webapplication.git
   cd IPO_Webapplication
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## Project Structure

```
IPO_Webapplication/
├── public/
│   ├── index.html                  # HTML template
│   ├── bluestock_logo.png          # Brand logo
│   ├── scanner.png                 # Scanner feature image
│   ├── ppl_banner.png              # Dashboard banner
│   ├── ppl*.webp/jpg/png           # Analysis content images
│   ├── favicon.ico                 # Favicon
│   ├── manifest.json               # PWA manifest
│   └── robots.txt                  # SEO robots file
│
├── src/
│   ├── App.js                      # Main app with routing
│   ├── index.js                    # Entry point with UserProvider
│   ├── index.css                   # Global styles + Tailwind directives
│   ├── App.css                     # App-level styles
│   │
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignIn.js           # Sign in with email/Google + reCAPTCHA
│   │   │   ├── SignUp.js           # Sign up with validation + Google OAuth
│   │   │   └── ForgotPassword.js   # Password reset flow
│   │   │
│   │   ├── Landing/
│   │   │   ├── LandingPage.js      # Main landing page with hero & footer
│   │   │   ├── IPOGrid.js          # IPO cards grid component
│   │   │   └── FAQSection.js       # FAQ accordion component
│   │   │
│   │   └── Dashboard.js            # Trading analysis dashboard
│   │
│   └── context/
│       └── UserContext.js           # Global user state management
│
├── package.json                    # Dependencies & scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── README.md                       # Project documentation
```

---

## Routes

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Home page with hero, IPO grid, FAQ |
| `/signin` | `SignIn` | User sign in |
| `/signup` | `SignUp` | User registration |
| `/forgot-password` | `ForgotPassword` | Password reset |
| `/dashboard` | `Dashboard` | Trading analysis dashboard |
| `/career` | `Career` | Career page (placeholder) |
| `/about` | `About` | About page (placeholder) |
| `/contact` | `Contact` | Contact page (placeholder) |
| `/blog` | `Blog` | Blog page (placeholder) |

---

## Key Components

### `LandingPage`
The main entry point featuring a sticky header with navigation, an animated hero section with trading SVG illustrations, the IPO grid, scroll-triggered animated text blocks, Bluestock highlights section, FAQ, and a comprehensive footer.

### `IPOGrid`
Displays upcoming IPOs in a responsive card grid with hover animations. Each card shows company name, price band, open/close dates, issue size, issue type, and links to RHP/DRHP documents.

### `Dashboard`
Interactive analysis hub where users choose between Technical and Fundamental analysis. Each section displays categorized cards with images and detailed content — some with multi-slide navigation.

### `UserContext`
React Context-based state management handling user registration, login validation, Google auth, and password reset across the application.

---

## Configuration

### Google OAuth
The app uses Google OAuth for social sign-in. Update the client ID in `SignIn.js` and `SignUp.js`:
```javascript
const GOOGLE_CLIENT_ID = 'your-google-client-id';
```

### reCAPTCHA
reCAPTCHA v2 is integrated for bot protection. Update the site key:
```javascript
const RECAPTCHA_SITE_KEY = 'your-recaptcha-site-key';
```

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Santhosh Kumar**
- GitHub: [@santhoshkumar1204](https://github.com/santhoshkumar1204)

---

## License

This project is part of the **Bluestock Fintech** ecosystem.

---

<p align="center">
  Made with ❤️ in India | Bluestock Fintech
</p>
