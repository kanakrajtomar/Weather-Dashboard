
import { Cloud, CloudRain, Sun } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12 animate-pulse-slow">
      <div className="flex items-center justify-center space-x-2">
        <Sun size={32} className="text-amber-400 animate-bounce-light" style={{ animationDelay: '0s' }} />
        <Cloud size={40} className="text-blue-300 animate-bounce-light" style={{ animationDelay: '0.1s' }} />
        <CloudRain size={36} className="text-blue-500 animate-bounce-light" style={{ animationDelay: '0.2s' }} />
      </div>
      <p className="text-gray-500 mt-4">Loading weather data...</p>
    </div>
  );
};

export default LoadingState;
