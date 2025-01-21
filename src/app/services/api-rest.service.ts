import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  url = 'https://api.themoviedb.org/3';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWJhYmM4OTk2ZDY0NTJhNzE3NzNlMDc4NjE1NDg4NiIsIm5iZiI6MTczNzIzMzQzMy45NTYsInN1YiI6IjY3OGMxNDE5NDJmMjdjNzU0YzY0ZmNhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QXnUv5wU1AWbJHJvaonwGOIWMCh-ALgvJPUzRsr8No4'
    }
  };

  constructor(private http: HttpClient) { }

  obtenerSitios(id: string): Observable<any> {
    return this.http.get(`${this.url}/movie/${id}/watch/providers`, this.options).pipe(retry(3));
  }
}
