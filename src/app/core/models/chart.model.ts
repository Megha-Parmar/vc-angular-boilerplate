import {
  ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export interface ChartOptions {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export interface GraphModel {
  graph_data: {
    string: number;
  };
  total_bookings: number;
  total_revenue: number;
  total_tickets: number;
}
