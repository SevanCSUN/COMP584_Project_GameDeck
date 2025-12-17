import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { GameDto } from '../models/game-dto.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = '/api/Game';

  constructor(private http: HttpClient) { }

  getGames(platformId?: number): Observable<GameDto[]> {
    let params = new HttpParams();
    if (platformId) {
      params = params.set('platformId', platformId.toString());
    }
    return this.http.get<GameDto[]>(this.apiUrl, { params });
  }

  getGame(id: number): Observable<GameDto> {
    return this.http.get<GameDto>(`${this.apiUrl}/${id}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  updateGame(id: number, game: Game): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

