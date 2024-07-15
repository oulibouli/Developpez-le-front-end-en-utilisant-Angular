import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicMappedData } from 'src/app/core/models/interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { CHART_CONFIG } from 'src/app/core/config/chart-config';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()
  data: OlympicMappedData[] = [];
  test!:Observable<any[]>
  title: string = "Medals per country";
  nbJos!: number
  nbCountries!: number

  // Get the parameters for ngx-charts
  view = CHART_CONFIG.view;
  legendPosition = CHART_CONFIG.legendposition;
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


  constructor(private olympicService: OlympicService, private router: Router, private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    // Make the app responsive when resizing the window
    this.adjustViewBasedOnWindowSize()

    // Get the data 
    this.olympicService.getOlympicMappedData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.data = data
      this.nbCountries = data.length
      this.nbJos = this.olympicService.nbJos
    })
  }

  // Unsuscribe the observable when destroying the component
  ngOnDestroy():void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // Route to the detailed page corresponding to the chosen country
  chooseCountry(event: OlympicMappedData) {
    const {id} = event.extra
    this.router.navigateByUrl(`/detail/${id}`)
  }

  // Listening on resizing the window to make the chart responsive
  @HostListener('window:resize')
    onResize() {
      this.adjustViewBasedOnWindowSize()
    }

  adjustViewBasedOnWindowSize() {
    this.view = this.responsiveService.adjustViewBasedOnWindowSize(window.innerWidth);
    this.legendPosition = this.responsiveService.getLegendPosition(window.innerWidth);
  }
}

