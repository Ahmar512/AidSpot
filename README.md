# AidSpot

AidSpot is a React-based web application that helps users find nearby hospitals based on their current location. It provides an intuitive interface to fetch medical facilities details like name, address, and rating.

## Live Demo

You can access the live version of the project here:
[Live Demo](https://ahmar512.github.io/AidSpot)


## Features

- **Google Firebase Authentication**: User Authentication (Login/Register via Email & Password or Google Sign-In) for secure login
- **Find Nearby Hospitals**: Automatically detects the user's location and lists hospitals nearby.
- **Map Integration**: Displays hospitals on an interactive map.
- **Hospital Details**: Provides essential details like name, address, and rating.
- **Toast Notifications**: Use react-hot-toast for a better user experience.
- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Maps & Location**: Google Maps API, Google Places API
- **State Management**: Zustand
- **Deployment**: GitHub Pages

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Git](https://git-scm.com/)

### Clone the Repository

```sh
git clone https://github.com/Ahmar512/AidSpot.git
cd AidSpot
```

### Install Dependencies

```sh
npm install
```

### Start the Development Server

```sh
npm run dev
```

Open `http://localhost:5173/` in your browser to view the app.

## Usage

1. Allow location access when prompted.
2. View nearby hospitals displayed on a map.
3. Click on a hospital to see more details.
