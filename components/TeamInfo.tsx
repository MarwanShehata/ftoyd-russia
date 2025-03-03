import { Team } from '@/types';
import { cn } from '@/lib/utils';

interface TeamInfoProps {
  team: Team;
  score: number;
  isHome: boolean;
}

export function TeamInfo({ team, score, isHome }: TeamInfoProps) {
  return (
    <div className={cn(
      'flex items-center justify-between w-full',
      isHome ? 'flex-row' : 'flex-row-reverse'
    )}>
      <div className={cn(
        'flex flex-col',
        isHome ? 'items-start' : 'items-end'
      )}>
        <h3 className="font-bold text-lg">{team.name}</h3>
        <p className="text-gray-600 text-sm">Place: {team.place} | Kills: {team.total_kills}</p>
      </div>
      <div className="text-3xl font-bold">{score}</div>
    </div>
  );
}