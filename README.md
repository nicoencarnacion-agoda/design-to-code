# Agoda Booking Support Dashboard

A simple internal training React app for managing mock bookings. This is a frontend-only application with no backend or API calls.

## Features

- **Dashboard** (`/`) - Overview with stats, revenue, and recent bookings
- **Booking List Page** (`/bookings`) - View all bookings with search and filter functionality
- **Booking Details Page** (`/booking/:id`) - View detailed booking information with action buttons
- **Create Booking** (`/booking/new`) - Create a new booking via form
- **Modify Booking Page** (`/booking/:id/edit`) - Edit booking details via form
- **Properties** (`/properties`) - List properties with booking counts and revenue
- **Guests** (`/guests`) - List guests with booking history
- **Calendar** (`/calendar`) - View bookings on a calendar by check-in/check-out dates
- **Reports** (`/reports`) - Analytics by status, property, and month
- **Activity Log** (`/activity`) - Simulated audit trail of actions
- **Settings** (`/settings`) - Display preferences (currency, date format) stored in localStorage
- **Help** (`/help`) - FAQ and usage guide

## Tech Stack

- React 18
- Material UI (MUI) v5
- React Router v6
- Vite (build tool)

## Prerequisites (macOS)

Before you begin, make sure you have the following installed on your machine:

### 1. Homebrew

Homebrew is a package manager for macOS that makes it easy to install software.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, follow the instructions in the terminal to add Homebrew to your PATH.

### 2. Node.js (v18 or higher recommended)

Node.js is a JavaScript runtime that includes **npm** (Node Package Manager), which is used to install project dependencies.

```bash
brew install node
```

### 3. Git (optional, for cloning the repository)

```bash
brew install git
```

### Verify Installation

After installing, verify everything is set up correctly:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
git --version     # Should show git version 2.x.x
```

---

## Cloning the Repository in Cursor

**Repository URL:** `https://github.com/nicoencarnacion-agoda/design-to-code.git`

1. Open **Cursor**
2. On the Welcome screen, click **"Clone Git Repository..."**
3. Paste the repository URL and press Enter
4. Choose a folder on your computer to save the project
5. When prompted, click **"Open"** to open the cloned repository

---

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   └── Layout.jsx            # Shared layout with sidebar navigation
  ├── context/
  │   └── BookingsContext.jsx   # In-memory booking state (add/update)
  ├── constants/
  │   └── bookingStatus.js      # Status chip styles
  ├── data/
  │   ├── mockBookings.js       # Mock booking data
  │   └── mockActivityLog.js    # Mock activity log entries
  ├── pages/
  │   ├── DashboardPage.jsx
  │   ├── BookingListPage.jsx
  │   ├── BookingDetailsPage.jsx
  │   ├── ModifyBookingPage.jsx
  │   ├── CreateBookingPage.jsx
  │   ├── PropertiesPage.jsx
  │   ├── GuestsPage.jsx
  │   ├── CalendarPage.jsx
  │   ├── ReportsPage.jsx
  │   ├── ActivityLogPage.jsx
  │   ├── SettingsPage.jsx
  │   ├── HelpPage.jsx
  │   └── NotFoundPage.jsx
  ├── App.jsx
  └── main.jsx
```

## Mock Data

The app uses mock booking data stored in `src/data/mockBookings.js`. Each booking includes:
- Booking ID, guest information, property details
- Check-in/check-out dates, number of nights and guests
- Status (Confirmed, Pending, Cancelled)
- Total amount and special requests

## Notes

- This is a training app with no backend integration
- All actions (Confirm, Cancel, Modify, Create) update in-memory state during the session
- Data resets on page refresh (except Settings, which uses localStorage)
- Uses MUI components and styling throughout
