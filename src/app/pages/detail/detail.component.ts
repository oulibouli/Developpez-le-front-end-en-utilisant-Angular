import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
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
  legendPosition = CHART_CONFIG.legendposition
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
    this.adjustViewBasedOnWindowSize();
    
    // Use paramMap instead of snapshot.params['id'] for observable based access
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.id = Number(params.get('id')); // Retrieve id from paramMap
      this.loadData() // load the data after getting the id
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  // Listening on resizing the window to make the chart responsive
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustViewBasedOnWindowSize();
  }

  loadData(): void {
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
  
  // Making the chart responsive
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
