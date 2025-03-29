
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  // Error check for API
  const isApiKeyError = message.includes('API key');
  
  return (
    <Alert 
      variant="destructive" 
      className="max-w-md mx-auto mt-6 animate-fade-in border-2"
    >
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-lg font-bold">
        {isApiKeyError ? "API Key Error" : "Error"}
      </AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {isApiKeyError && (
          <p className="mt-2 text-sm">
            Try using a different API key or check if the current key has expired.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
