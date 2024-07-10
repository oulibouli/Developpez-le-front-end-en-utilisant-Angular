import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject<void>();
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

  ngOnInit(): void {
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
      }),
      takeUntil(this.destroy$) // Using takeUntil to unsubscribe to the observable when using ngOnDestroy
    ).subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
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
