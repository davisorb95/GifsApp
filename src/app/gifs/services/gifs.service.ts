import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gift } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey    : string = 'v2nTKyimVjh7dNuWC2vj5qNU3cILhSkI';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history   : string[] = [];

  results: Gift[] = [];

  get history(): string[] {
    return [...this._history];
  }

  searchGifs( query: string = '' ): void {
    query = query.trim().toLowerCase();

    if ( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.slice( 0, 10 );
    }

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', query );

    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe(( gifsResponse: SearchGifsResponse ) => {
        this.results = gifsResponse.data;
      });
  }

  constructor(
    private http: HttpClient
  ) {
    // Acá recuperan esos datos del local o del session storage
   }
}
