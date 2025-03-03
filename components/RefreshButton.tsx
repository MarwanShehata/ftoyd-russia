import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface RefreshButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function RefreshButton({ isLoading, onClick }: RefreshButtonProps) {
  return (
    <Button 
      variant="default" 
      onClick={onClick} 
      disabled={isLoading}
      className="bg-blue-700 hover:bg-blue-800"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Refreshing...
        </>
      ) : (
        'Refresh'
      )}
    </Button>
  );
}