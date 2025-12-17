export interface GameDto {
  id: number;
  platformId: number;
  platformName: string;
  title: string;
  releaseDate: string;
  genre: string;
  developer: string;
  description: string;
  numPlayers?: number;
}


