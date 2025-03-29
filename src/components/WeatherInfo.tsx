import {
  RefreshCw,
  Thermometer,
  Droplet,
  Wind,
  MapPin,
  Calendar,
  Umbrella,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  WeatherData,
  getWeatherIconUrl,
  getWeatherBackground,
  convertWindSpeed,
  formatDateTime,
} from "../services/weatherService";
import { Separator } from "@/components/ui/separator";

interface WeatherInfoProps {
  weatherData: WeatherData;
  onRefresh: () => void;
  loading: boolean;
}

// Main weather display component
const WeatherInfo = ({ weatherData, onRefresh, loading }: WeatherInfoProps) => {

  if (!weatherData) return null;

  const { name, main, weather, wind, sys, dt, timezone } = weatherData;

  // Basic weather info
  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;
  const weatherIcon = weather[0].icon;

  const backgroundClass = getWeatherBackground(weatherCondition);

  
  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 animate-fade-in">
      <Card className={`overflow-hidden shadow-lg ${backgroundClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center text-white">
            <MapPin className="mr-2" size={20} />
            <h2 className="text-2xl font-bold">
              {name}, {sys.country}
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            <span className="sr-only">Refresh</span>
          </Button>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-effect p-4 flex flex-col items-center justify-center text-white rounded-md">
              <div className="flex items-center">
                <img
                  src={getWeatherIconUrl(weatherIcon)}
                  alt={weatherDescription}
                  className="w-20 h-20"
                />
                <div className="text-5xl font-bold ml-2">
                  {formatTemp(main.temp)}
                </div>
              </div>
              <div className="text-lg capitalize mt-1">
                {weatherDescription}
              </div>
              <div className="text-sm mt-1">
                Feels like {formatTemp(main.feels_like)}
              </div>

              <div className="flex justify-between w-full mt-4 text-sm">
                <div>Min: {formatTemp(main.temp_min)}</div>
                <div>Max: {formatTemp(main.temp_max)}</div>
              </div>
            </div>

            {/* Weather details */}
            <div className="glass-effect p-4 text-white rounded-md">
              <h3 className="text-xl font-semibold mb-3">Weather Details</h3>

              <div className="space-y-4">
                {/* Temperature */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Thermometer className="mr-2" size={18} />
                    <span>Temperature</span>
                  </div>
                  <span>{formatTemp(main.temp)}</span>
                </div>

                <Separator className="bg-white/20" />

                {/* Humidity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Droplet className="mr-2" size={18} />
                    <span>Humidity</span>
                  </div>
                  <span>{main.humidity}%</span>
                </div>

                <Separator className="bg-white/20" />

                {/* Wind speed */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="mr-2" size={18} />
                    <span>Wind Speed</span>
                  </div>
                  <span>{convertWindSpeed(wind.speed)} km/h</span>
                </div>

                <Separator className="bg-white/20" />

                {/* Last updated time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={18} />
                    <span>Updated</span>
                  </div>
                  <span className="text-sm">
                    {new Date(dt * 1000).toLocaleTimeString()}
                  </span>
                </div>

                {/* Chenges have to do in the code in future: Add precipitation chance when API supports it
                <Separator className="bg-white/20" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Umbrella className="mr-2" size={18} />
                    <span>Precipitation</span>
                  </div>
                  <span>Coming soon</span>
                </div>
                */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherInfo;
