import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherByCity, WeatherData } from '../services/weatherService';
import { toast } from 'sonner';

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = 'recentSearches';

// Main hook for weather functionality
export const useWeather = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem(STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (err) {
      console.warn('Failed to load recent searches from localStorage', err);
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch (err) {
      console.error('Failed to save recent searches', err);
    }
  }, [recentSearches]);

  const updateRecentSearches = useCallback((city: string) => {
    if (!city) return; // Sanity check
    
    setRecentSearches(prev => {
      const filteredSearches = prev.filter(
        s => s.toLowerCase() !== city.toLowerCase()
      );
      
      // New array with current city at beginning
      return [city, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
    });
  }, []);

  // Fetch weather data for a given city
  const fetchWeather = useCallback(async (searchCity: string) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    const startTime = performance.now();

    try {
      const data = await fetchWeatherByCity(searchCity);
      
      // Log API response time in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Weather API response time: ${Math.round(performance.now() - startTime)}ms`);
      }
      
      setWeatherData(data);
      updateRecentSearches(data.name);
      setCity(''); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Weather fetch error:', err);
      } else {
        setError('Failed to fetch weather data');
        console.error('Unknown weather fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [updateRecentSearches]);

  // Handle form submission
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (city.trim()) {
      fetchWeather(city);
    } else {
      toast.error('Please enter a city name');
    }
  }, [city, fetchWeather]);

  // Choose from recent searches list
  const searchByRecentCity = useCallback((recentCity: string) => {
    fetchWeather(recentCity);
  }, [fetchWeather]);

  // Refresh current weather data (for example after waiting a while)
  const refreshWeather = useCallback(() => {
    if (weatherData?.name) {
      fetchWeather(weatherData.name);
      toast.success(`Weather for ${weatherData.name} updated!`);
    } else {
      toast.error('No weather data to refresh');
    }
  }, [fetchWeather, weatherData?.name]);

  return {
    city,
    setCity,
    weatherData,
    loading,
    error,
    handleSearch,
    recentSearches,
    searchByRecentCity,
    refreshWeather
  };
};
