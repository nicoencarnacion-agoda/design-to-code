# Agoda Booking Support Dashboard

A simple internal training React app for managing mock bookings. This is a frontend-only application with no backend or API calls.

## Features

- **Booking List Page** (`/`) - View all bookings with search and filter functionality
- **Booking Details Page** (`/booking/:id`) - View detailed booking information with action buttons
- **Modify Booking Page** (`/booking/:id/edit`) - Edit booking details via form

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
  ├── data/
  │   └── mockBookings.js      # Mock booking data
  ├── pages/
  │   ├── BookingListPage.jsx   # Main booking list with search/filter
  │   ├── BookingDetailsPage.jsx # Booking details view
  │   └── ModifyBookingPage.jsx  # Edit booking form
  ├── App.jsx                   # Main app component with routing
  └── main.jsx                  # Entry point
```

## Mock Data

The app uses mock booking data stored in `src/data/mockBookings.js`. Each booking includes:
- Booking ID, guest information, property details
- Check-in/check-out dates, number of nights and guests
- Status (Confirmed, Pending, Cancelled)
- Total amount and special requests

## Notes

- This is a training app with no backend integration
- All actions (Confirm, Cancel, Modify) are simulated and log to console
- No actual state persistence - data resets on page refresh
- Uses MUI components and styling throughout
