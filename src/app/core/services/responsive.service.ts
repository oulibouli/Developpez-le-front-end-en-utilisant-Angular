import { Injectable } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CHART_CONFIG } from '../config/chart-config';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() {}

  // Making the chart responsive depending on the window size
  adjustViewBasedOnWindowSize(screenWidth: number): [number, number] {
    if (screenWidth <= 768) {
        return [screenWidth - 30, 300]; // Adjust chart for small screens
    } else {
      return CHART_CONFIG.view; // Default value
    }
  }
  // Defining the legend position depending on the window size
  getLegendPosition(screenWidth: number): LegendPosition {
    return screenWidth < 768 ? LegendPosition.Below : LegendPosition.Right
  }
}
