import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CHART_CONFIG } from 'src/app/core/config/chart-config';
import { OlympicCountry, DetailMappedData } from 'src/app/core/models/interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<OlympicCountry[]>
  public data!: DetailMappedData[]
  private destroy$ = new Subject<void>();
  id!: number
  title!: string
  nbParticipations!: number
  nbMedals!: number
  nbAthletes!: number

  // Get the parameters for ngx-charts
  view = CHART_CONFIG.view;
  showXAxis = CHART_CONFIG.showXAxis;
  showYAxis = CHART_CONFIG.showYAxis;
  gradient = CHART_CONFIG.gradient;
  showLegend = CHART_CONFIG.showLegend;
  showXAxisLabel = CHART_CONFIG.showXAxisLabel;
  xAxisLabel = CHART_CONFIG.xAxisLabel.country;
  showYAxisLabel = CHART_CONFIG.showXAxisLabel;
  yAxisLabel = CHART_CONFIG.yAxisLabel.country;
  animations= CHART_CONFIG.animations;

  constructor(private olympicService: OlympicService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id'])
    this.olympicService.getCountryMappedData(this.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.data = data
      this.title = this.olympicService.title
      this.nbParticipations = this.olympicService.nbParticipations
      this.nbMedals = this.olympicService.nbMedals
      this.nbAthletes = this.olympicService.nbAthletes
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
