import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { OlympicMappedData } from 'src/app/core/models/mapped-data';
import { CHART_CONFIG } from 'src/app/core/config/chart-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<OlympicCountry[]>
  public data: OlympicMappedData[] = [];
  private destroy$ = new Subject<void>()
  test!:Observable<any[]>
  title: string = "Medals per country";
  nbJos!: number
  nbCountries!: number

  // Get the parameters for ngx-charts
  view = CHART_CONFIG.view;
  showXAxis = CHART_CONFIG.showXAxis;
  showYAxis = CHART_CONFIG.showYAxis;
  gradient = CHART_CONFIG.gradient;
  showLegend = CHART_CONFIG.showLegend;
  showXAxisLabel = CHART_CONFIG.showXAxisLabel;
  xAxisLabel = CHART_CONFIG.xAxisLabel.olympic;
  showYAxisLabel = CHART_CONFIG.showXAxisLabel;
  yAxisLabel = CHART_CONFIG.yAxisLabel.olympic;
  labels=CHART_CONFIG.labels;
  doughnut=CHART_CONFIG.doughnut;
  arcWidth= CHART_CONFIG.arcWidth;
  tooltipDisabled= CHART_CONFIG.tooltipDisabled;
  animations= CHART_CONFIG.animations;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getOlympicMappedData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.data = data
      this.nbCountries = data.length
      this.nbJos = this.olympicService.nbJos
    })
  }

  ngOnDestroy():void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  chooseCountry(event: OlympicMappedData) {
    const id = event.extra.id
    this.router.navigateByUrl(`/detail/${id}`)
  }
}

