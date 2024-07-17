import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CHART_CONFIG } from 'src/app/core/config/chart-config';
import { OlympicCountry, DetailMappedData } from 'src/app/core/models/interfaces';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private id!: number
  olympics$!: Observable<OlympicCountry[]>
  data!: DetailMappedData[]
  title!: string
  nbParticipations!: number
  nbMedals!: number
  nbAthletes!: number

  // Get the parameters for ngx-charts
  view = CHART_CONFIG.view;
  legendPosition = CHART_CONFIG.legendPosition
  showXAxis = CHART_CONFIG.showXAxis;
  showYAxis = CHART_CONFIG.showYAxis;
  gradient = CHART_CONFIG.gradient;
  showLegend = CHART_CONFIG.showLegend;
  showXAxisLabel = CHART_CONFIG.showXAxisLabel;
  xAxisLabel = CHART_CONFIG.xAxisLabel.country;
  showYAxisLabel = CHART_CONFIG.showXAxisLabel;
  yAxisLabel = CHART_CONFIG.yAxisLabel.country;
  animations= CHART_CONFIG.animations;

  constructor(private olympicService: OlympicService,private route: ActivatedRoute, private responsiveService: ResponsiveService) {}

  // When component initialized 
  ngOnInit(): void {
    this.adjustViewBasedOnWindowSize() // Display the content depending on the window size
    this.subscribeToRouteParams(); // Susbcribe to the parameters in the url
  }
  // When component is destroyed
  ngOnDestroy(): void {
    this.destroy$.next() // Emit an empy value to notify the subscribers to unsuscribe (see takeUntil)
    this.destroy$.complete() // End the Subject
  }
  // Listening on resizing the window to make the chart responsive
  @HostListener('window:resize')
  onResize() {
    this.adjustViewBasedOnWindowSize()
  }

  private subscribeToRouteParams(): void {
    // Use paramMap instead of snapshot.params['id'] for observable based access
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.id = Number(params.get('id')); // Retrieve id from paramMap
      this.loadData() // load the data after getting the id
    });
  }

  private loadData(): void {
    this.olympicService.getCountryMappedData(this.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.data = data;
      this.title = this.olympicService.title;
      this.nbParticipations = this.olympicService.nbParticipations;
      this.nbMedals = this.olympicService.nbMedals;
      this.nbAthletes = this.olympicService.nbAthletes;
    });
  }

  private adjustViewBasedOnWindowSize() {
    this.view = this.responsiveService.adjustViewBasedOnWindowSize(window.innerWidth);
    this.legendPosition = this.responsiveService.getLegendPosition(window.innerWidth);
  }
}
