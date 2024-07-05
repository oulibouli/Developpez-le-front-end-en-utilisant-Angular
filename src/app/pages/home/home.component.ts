import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>
  olympicData: any[] = []

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

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((response) => {
      this.olympicData = response?.map((oc) => ({ // Mapping des donnees dans le tableau olympicData
        name: oc.country,
        value: oc.participations.reduce(
          (total: number, participation: Participation) =>
            total + participation.medalsCount,
          0
        ),
        extra: {
          id: oc.id,
        },
      }));
    })
  }
  chooseCountry(event: any) {
    const id = event.extra.id
      console.log(id)
  }
}

