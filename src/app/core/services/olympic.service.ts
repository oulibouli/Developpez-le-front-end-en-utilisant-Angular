import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { OlympicCountry, Participation, DetailMappedData, OlympicMappedData } from 'src/app/core/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  nbCountries!: number
  nbJos!: number
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  title!: string;
  nbParticipations!: number;
  nbMedals!: number;
  nbAthletes!: number;
  
  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)), // update BehaviorSubject with the new data
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return of([]); // if error, return a new empty observable
      })
    );
  }

  getOlympics():Observable<OlympicCountry[]>{
    return this.olympics$.pipe(
      // Check if data are existing in olympics$
      switchMap(cachedData => {
        if (cachedData) {
          // if data available in the cache we return it
          return of(cachedData)
        }
        else {
          // Else load data from the backend
          return this.loadInitialData()
        }
      })
    )
  }

  getOlympicMappedData(): Observable<OlympicMappedData[]> {
    return this.getOlympics().pipe(
      map(response => {
          return response.map(country => ({
            name: country.country,
            value: this.calculateOlympicMappedData(country.participations),
            extra: {
              id: country.id,
            }
          }))
      })
    )
  }
  calculateOlympicMappedData(participations: Participation[]): number {
    const jos = new Set();
    for (const participation of participations) {
      const keyJos = `${participation.year}-${participation.city}`;
      jos.add(keyJos);
    }
    this.nbJos = jos.size
    const totalMedals = participations.reduce((total, participation) => total + participation.medalsCount, 0);
    return totalMedals
  }

  getCountryMappedData(id: number): Observable<DetailMappedData[]> {
    return this.getOlympics().pipe(
      map(response => {
        const countryData = response.find(c => c.id === id);
        if(countryData){
          this.title = countryData.country
          this.nbParticipations = countryData.participations.length
          this.nbMedals = countryData.participations.reduce((total, participation) => total + participation.medalsCount, 0)
          this.nbAthletes = countryData.participations.reduce((total, participation) => total + participation.athleteCount, 0)

          return this.calculateCountryMappedData(countryData.participations);
        }
        else return []
      })
    )
  }
  calculateCountryMappedData(participations: Participation[]): DetailMappedData[] {
    return [
      {
        "name": "Medals Count",
        "series": participations.map(participation => ({
          "name": participation.year.toString(),
          "value": participation.medalsCount
        }))
      }
    ];
  }
}
