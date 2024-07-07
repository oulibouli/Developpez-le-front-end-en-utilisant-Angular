import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>
  public data$!: Observable<any[]>;
  olympicData: any[] = []
  title: string = "Medals per country";
  nbJos!: number
  nbCountries!: number

  // On définit les paramètres utiles a ngx-charts
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Medals';
  labels=true;
  doughnut=false;
  arcWidth=0.35;
  tooltipDisabled=false;
  animations=true;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.data$ = this.olympics$.pipe(
      map(response => {
        this.nbCountries = response.length;
        return response.map(country => ({
        name: country.country,
        value: this.calculations(country.participations),
        extra: {
          id: country.id,
        }
      }))})
    );

    this.data$.subscribe(data => {
      this.olympicData = data;
    });
  }
  calculations(participations: Participation[]): number {
    const jos = new Set();
    for (const participation of participations) {
      const keyJos = `${participation.year}-${participation.city}`;
      jos.add(keyJos);
    }
    this.nbJos = jos.size
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }
  chooseCountry(event: any) {
    const id = event.extra.id
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

