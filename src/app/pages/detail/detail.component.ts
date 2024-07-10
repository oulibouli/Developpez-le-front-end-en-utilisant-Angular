import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DetailMappedData } from 'src/app/core/models/detail-mapped-data';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  public olympics$!: Observable<OlympicCountry[]>
  public data!: DetailMappedData[]
  id!: number
  title!: string
  nbParticipations!: number
  nbMedals!: number
  nbAthletes!: number

  // On définit les paramètres utiles a ngx-charts
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Medal count';
  animations = true;

  constructor(private olympicService: OlympicService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id'])

    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      map(response => {
        const countryData = response.find(c => c.id === this.id);
        if(countryData){
          this.title = countryData.country
          this.nbParticipations = countryData.participations.length
          this.nbMedals = countryData.participations.reduce((total, participation) => total + participation.medalsCount, 0)
          this.nbAthletes = countryData.participations.reduce((total, participation) => total + participation.athleteCount, 0)

          return this.transformDataForChart(countryData.participations);
        }
        else return []
      })
    ).subscribe(data => {
      this.data = data;
    });
  
  }
  transformDataForChart(participations: Participation[]): any[] {
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
