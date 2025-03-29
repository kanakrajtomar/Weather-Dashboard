import { useWeather } from "../hooks/useWeather";
import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import WeatherInfo from "../components/WeatherInfo";
import LoadingState from "../components/LoadingState";
import ErrorDisplay from "../components/ErrorDisplay";
import { Cloud, CloudSun } from "lucide-react";

const Index = () => {
  const {
    city,
    setCity,
    weatherData,
    loading,
    error,
    handleSearch,
    recentSearches,
    searchByRecentCity,
    refreshWeather,
  } = useWeather();

  return (
    <div className="weather-app min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="app-container container mx-auto px-4 py-6 flex flex-col items-center">
        <header className="app-header flex items-center mb-6 md:mb-8">
          <CloudSun size={40} className="app-logo text-blue-500 mr-3" />
          <h1 className="app-title text-3xl md:text-4xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
        </header>

        {/* Search functionality */}
        <div className="search-container w-full max-w-md">
          <SearchBar
            city={city}
            setCity={setCity}
            handleSearch={handleSearch}
            isLoading={loading}
          />
        </div>

        {/* Recent searches */}
        {recentSearches.length > 0 && (
          <RecentSearches
            searches={recentSearches}
            onSelectCity={searchByRecentCity}
          />
        )}

        {/* Main content area */}
        <main className="weather-content w-full">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorDisplay message={error} />
          ) : weatherData ? (
            <WeatherInfo
              weatherData={weatherData}
              onRefresh={refreshWeather}
              loading={loading}
            />
          ) : (
            <div className="empty-state flex flex-col items-center justify-center my-12 text-center">
              <Cloud size={80} className="text-blue-300 mb-4 opacity-60" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Enter a city to get weather information
              </h2>
              <p className="text-gray-500 max-w-md">
                Search for any city in the world to see current weather
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
