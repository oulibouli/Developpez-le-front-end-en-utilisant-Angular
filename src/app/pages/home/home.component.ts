import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicCountry, OlympicMappedData } from 'src/app/core/models/interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { CHART_CONFIG } from 'src/app/core/config/chart-config';
import { LegendPosition } from '@swimlane/ngx-charts';

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
  legendPosition = CHART_CONFIG.legendposition
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
    this.adjustViewBasedOnWindowSize();
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

  /* Listening on resizing the window to make the chart responsive */
  @HostListener('window:resize', ['$event'])
    onResize() {
        this.adjustViewBasedOnWindowSize();
    }
  /* Making the chart responsive */
  adjustViewBasedOnWindowSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
          this.view = [screenWidth - 30, 300]; // adjust chart for small screens
          this.legendPosition = LegendPosition.Below // Put the legend below to read correctly
      } else {
        this.view = CHART_CONFIG.view; // Default value
      }
  }
}

