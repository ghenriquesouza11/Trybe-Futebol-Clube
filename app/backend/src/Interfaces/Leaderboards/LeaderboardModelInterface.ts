export type TeamPerformance = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
};

export interface LeaderboardsModelsInterface {
  totalGames(teamId: number): Promise<number>;
  totalVictories(teamId: number): Promise<number>;
  totalDraws(teamId: number): Promise<number>;
  totalLosses(teamId: number): Promise<number>;
  goalsFavor(teamId: number): Promise<number>;
  goalsOwn(teamId: number): Promise<number>;
}
