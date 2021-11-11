import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyTokenService } from './spotify-token.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  favouriteList: Array<any> = [];

  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { "Authorization": `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: String): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
      })
    );
  }

  getAlbumsByArtistId(id: String): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          { headers: { "Authorization": `Bearer ${token}` } }
        );
      })
    );
  }

  getAlbumById(id: String): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
      })
    );
  }

  searchArtists(searchString: String): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          { headers: { "Authorization": `Bearer ${token}` } }
        );
      })
    );
  }

  addToFavourites(id: String) {
    if (id || this.favouriteList.length < 50){
      this.favouriteList.push(id);
      return true;
    }
    return false;
  }

  removeFromFavourites(id: String){
    const index = this.favouriteList.indexOf(id);
    this.favouriteList.splice(index, 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favouriteList.length > 0){
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouriteList.join(',')}`)
        })
      )
    } else {
      return new Observable(o => o.next([]));
    }
  }
}
