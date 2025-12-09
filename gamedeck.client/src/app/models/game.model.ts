import { Console } from './console.model';

export interface Game {
  id: number;
  platformId: number;
  title: string;
  releaseDate: string;
  genre: string;
  developer: string;
  description: string;
  numPlayers?: number;
  platform?: Console;  // Optional navigation property
}

