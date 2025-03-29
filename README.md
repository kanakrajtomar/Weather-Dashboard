# Weather Dashboard

A simple and user-friendly weather app that gives you real-time weather updates. Whether you need to check the forecast before heading out or just want to see how the weather is looking, this app has got you covered!

## Features

- Live weather updates using OpenWeatherMap.
- Search for any city worldwide.
- Quick access to recent searches.
- Works smoothly on desktop, tablet, and mobile.
- Clear error messages if something goes wrong.
- Smooth UI animations.
- Weather-based dynamic backgrounds.

## Tech Stack

### Core Technologies

- React (18.3.1) – Fast and interactive UI.
- TypeScript (5.5.3) – Better code reliability.
- Vite (5.4.1) – Fast development and build tool.

### UI & Styling

- Tailwind CSS (3.4.11) – Modern utility-first styling.
- Shadcn UI Components – Pre-built UI elements.
- Radix UI – Enhances accessibility.
- Lucide React – Icon library.

### State Management & Data Handling

- React Query (5.56.2) – Manages API requests and caching.
- React Hook Form (7.53.0) – Handles form inputs and validation.

### Additional Libraries

- date-fns – For easy date formatting.
- Sonner – For displaying notifications.
- Zod – Ensures form validation and data integrity.

## Installation Guide

1. Clone the repository:

```bash
git clone <your-repository-url>
cd weather-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API key:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

4. Run the app:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
weather-dashboard
 ┣ src
 ┃ ┣ components    # Reusable UI components
 ┃ ┣ pages         # Main pages/screens
 ┃ ┣ services      # API calls and utility functions
 ┃ ┣ assets        # Images and static files
 ┣ index.tsx       # Main entry point
 ┣ App.tsx         # Root component
 ┗ ...
```

## How It Works

### Fetching Weather Data

- Uses OpenWeatherMap API for real-time weather updates.
- Implements caching to avoid unnecessary API calls.
- Displays a loading state while fetching data.

### User Interface

- Styled with **Tailwind CSS**.
- UI components from **Shadcn** for consistency.
- Mobile-friendly layout.

### Performance Optimizations

- Lazy loading components.
- Optimized images for faster loading.
- Minimized bundle size.

## Responsive Design

The app follows a **mobile-first** approach:

- **Mobile (320px+)** – Compact layout.
- **Tablet (768px+)** – Optimized for medium screens.
- **Desktop (1024px+)** – Full-width layout with more details.

## Configuration Files

- `vite.config.ts` – Vite settings.
- `tailwind.config.ts` – Tailwind styling settings.
- `tsconfig.json` – TypeScript configuration.

Thanks for checking out the project! Any feedback or contributions are welcome. 
