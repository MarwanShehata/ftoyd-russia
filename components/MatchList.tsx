'use client'
import { Match } from '@/types';
import { MatchCard } from './MatchCard';
import { RefreshButton } from './RefreshButton';
import { useMatches } from '@/hooks/useMatches';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/useToast';
import { Loader2 } from 'lucide-react';

interface MatchListProps {
  initialMatches?: Match[];
}

export function MatchList({ initialMatches }: MatchListProps) {
  const { matches, error, isLoading, isRefreshing, refresh } = useMatches({ 
    initialData: initialMatches 
  }); 
  
  const { toast } = useToast();
  
  const handleRefresh = async () => {
    try {
      await refresh();
      toast({
        title: "Updated",
        description: "Match data has been refreshed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh match data",
      });
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Match Tracker</h1>
        <RefreshButton 
          isLoading={isLoading || isRefreshing} 
          onClick={handleRefresh} 
        />
      </div>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-1">Failed to load information.</span>
        </div>
      ) : isLoading && !initialMatches ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      ) : matches?.length ? (
        <div>
          {matches.map((match, index) => (
            <MatchCard key={`${match.title}-${index}`} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No matches available
        </div>
      )}
      
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
}