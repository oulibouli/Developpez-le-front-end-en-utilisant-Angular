import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics():Observable<OlympicCountry[]>{
    //return this.olympics$.asObservable();
    return this.http.get<OlympicCountry[]>(this.olympicUrl);
  }
  // findOlympicCountryById(id: number): Observable<OlympicCountry[]> {
  //   return this.getOlympics().pipe(
  //     map((countries: OlympicCountry[]) => countries.find(country => country.id === id))
  //   );
  // }
}
