import { Match, MatchStatus } from '@/types';
import { TeamInfo } from './TeamInfo';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { title, time, status, homeTeam, awayTeam, homeScore, awayScore } = match;
  
  // Format date
  const matchDate = new Date(time);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(matchDate);
  
  // Get status badge style
  const getStatusClass = (status: MatchStatus): string => {
    const baseClass = 'px-2 py-1 rounded-md text-xs font-medium uppercase';
    
    switch (status) {
      case 'Scheduled':
        return cn(baseClass, 'bg-gray-200 text-gray-700');
      case 'Ongoing':
        return cn(baseClass, 'bg-amber-100 text-amber-600');
      case 'Finished':
        return cn(baseClass, 'bg-green-100 text-green-700');
      default:
        return cn(baseClass, 'bg-gray-200 text-gray-700');
    }
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">{title}</h2>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm mr-3">{formattedDate}</span>
            <span className={getStatusClass(status)}>{status}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <TeamInfo 
            team={homeTeam} 
            score={homeScore} 
            isHome={true} 
          />
          
          <div className="border-t border-gray-200 my-2"></div>
          
          <TeamInfo 
            team={awayTeam} 
            score={awayScore} 
            isHome={false} 
          />
        </div>
      </CardContent>
    </Card>
  );
}