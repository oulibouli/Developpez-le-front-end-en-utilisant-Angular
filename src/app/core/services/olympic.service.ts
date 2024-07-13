import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry, Participation, DetailMappedData, OlympicMappedData } from 'src/app/core/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  nbCountries!: number
  nbJos!: number
  private olympicUrl = 'https://mp6a895b3ea21646b066.free.beeceptor.com/data';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  private localStorageKey = 'olympicData';
  title!: string;
  nbParticipations!: number;
  nbMedals!: number;
  nbAthletes!: number;
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.saveToLocalStorage(value);
        this.olympics$.next(value)
      }), // update BehaviorSubject with the new data
      catchError((error) => {
        console.error(error);

        this.snackBar.open('Error', 'Close', {
          duration: 5000
        });
        return of([]); // if error, return a new empty observable
      })
    );
  }

  saveToLocalStorage(data: OlympicCountry[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  private getFromLocalStorage(): OlympicCountry[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  getOlympics():Observable<OlympicCountry[]>{
    const cachedData = this.getFromLocalStorage()
    if(cachedData && cachedData.length > 0) {
      this.olympics$.next(cachedData)
    }
    else {
      this.loadInitialData()
    }
    return this.olympics$
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
