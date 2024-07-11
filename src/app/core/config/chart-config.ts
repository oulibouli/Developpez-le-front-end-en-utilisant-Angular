import { LegendPosition } from "@swimlane/ngx-charts";

// Define the parameters for the charts
export const CHART_CONFIG = {
    view: [700, 400] as [number, number],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: {olympic: 'Country', country: 'Dates'},
    showYAxisLabel : true,
    yAxisLabel: {olympic: 'Medals', country: 'Medal count'},
    labels: true,
    doughnut: false,
    arcWidth: 0.35,
    tooltipDisabled: false,
    animations: true,
    legendposition: LegendPosition.Right
}