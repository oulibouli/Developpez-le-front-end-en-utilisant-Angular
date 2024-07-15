import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry, Participation, DetailMappedData, OlympicMappedData } from 'src/app/core/models/interfaces';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  //For testing purpose only
  //private olympicUrl = 'https://mp6a895b3ea21646b066.free.beeceptor.com/data';
  private olympicUrl = '/assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]); // Using a BehaviorSubject, type of Observable to manage with the network status
  private localStorageKey = 'olympicData';
  nbJos!: number
  title!: string;
  nbParticipations!: number;
  nbMedals!: number;
  nbAthletes!: number;
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private networkService: NetworkService) {
    
    // We subscribe to networkService observable to check when user goes offline and load data from localStorage.
    // If back online, we reload the data from the data source
    this.networkService.getStatusOnline().subscribe((offline) => {
      const cachedData = this.getFromLocalStorage()
      if(cachedData && cachedData.length > 0 && offline) {
        this.olympics$.next(cachedData)
      }
      else {
        this.loadInitialData().subscribe()
      }
    })
  }

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.saveToLocalStorage(value);
        this.olympics$.next(value)
      }), // update BehaviorSubject with the new data
      catchError((error) => {
        console.error(error);
        this.snackBar.open('Error', 'Close', { duration: 5000 });
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
    return this.olympics$
  }

  getOlympicMappedData(): Observable<OlympicMappedData[]> {
    return this.getOlympics().pipe( // pipe the data from the observable and map it
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
    const jos = new Set(); // Using a Set to get unique values
    for (const participation of participations) {
      const keyJos = `${participation.year}-${participation.city}`; // Define a unique key with year and city
      jos.add(keyJos);
    }
    this.nbJos = jos.size
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

  getCountryMappedData(id: number): Observable<DetailMappedData[]> {
    return this.getOlympics().pipe( // pipe the data from the observable and map it
      map(response => {
        const countryData = response.find(c => c.id === id); // Get the data retrieved from the id in the url parameters
        if(countryData) {
          this.title = countryData.country
          this.nbParticipations = countryData.participations.length
          this.nbMedals = countryData.participations.reduce((total, participation) => total + participation.medalsCount, 0)
          this.nbAthletes = countryData.participations.reduce((total, participation) => total + participation.athleteCount, 0)

          return this.calculateCountryMappedData(countryData.participations);
        }
        else { return [] }
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
