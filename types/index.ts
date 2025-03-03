export type Player = {
  username: string;
  kills: number;
};

export type Team = {
  name: string;
  players: Player[];
  points: number;
  place: number;
  total_kills: number;
};

export type MatchStatus = "Scheduled" | "Ongoing" | "Finished";

export type Match = {
  time: string;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
};

export type APIResponse = {
  ok: boolean;
  data: {
    matches: Match[];
  };
};

export type MatchesResponse = Match[];
