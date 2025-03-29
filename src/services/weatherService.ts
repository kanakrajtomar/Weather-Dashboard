import { toast } from "sonner";





const API_KEY = "4818159e518420df2c21e76f5e7b8717";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


// OpenWeatherMap API 
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  cod: number;
}


/**
 * Fetches current weather data 
 * 
 * @param city - The name of the city to fetch weather for
 * @returns Promise with the weather data
 * @throws 
 */
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  if (!city || city.trim() === '') {
    throw new Error('City name is required');
  }

  try {
    console.log(`Fetching weather data for: ${city}`);
    
    
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    const data = await response.json();
    
    // Specific error handling for API key issues
    if (data.cod === 401) {
      console.error("API key error:", data.message);
      throw new Error("API key is invalid or expired. Please check the documentation.");
    }
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.");
      }
      throw new Error(`Error ${response.status}: ${data.message || 'Failed to fetch weather data'}`);
    }
    

    
    return data;
  } catch (error) {
    // Log and show user-friendly messages
    if (error instanceof Error) {
      console.error("Weather fetch error:", error.message);
      toast.error(error.message);
    } else {
      console.error("Unknown weather error type:", error);
      toast.error("An unexpected error occurred");
    }
   
    throw error;
  }
};


export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};


export const getWeatherBackground = (weatherMain: string): string => {
  const main = weatherMain.toLowerCase();
  
  if (main.includes('clear')) return 'weather-grad-sunny';
  if (main.includes('cloud') || main.includes('fog') || main.includes('mist')) return 'weather-grad-cloudy';
  if (main.includes('rain') || main.includes('drizzle')) return 'weather-grad-rainy';
  if (main.includes('snow')) return 'weather-grad-snowy';
  if (main.includes('thunder')) return 'weather-grad-stormy';
  
  // Default fallback for unknown conditions
  return 'weather-grad-blue';
};

/**
 * Formats a Unix timestamp into a readable date/time with timezone adjustment
 */
export const formatDateTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleString();
};

/**
 * Converts wind speed from API meters/second to kilometers/hour 
 */
export const convertWindSpeed = (speed: number): number => {
  return Math.round(speed * 3.6); // m/s to km/h
};
