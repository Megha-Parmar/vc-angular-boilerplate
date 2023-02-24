import { Injectable } from '@angular/core';
import { ExportToCsv } from "export-to-csv";
import { DateFormatService } from 'src/app/core/services/date-format.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadCsvService {
  constructor(private dateFormateService: DateFormatService) { }

  // download report as csv
  downloadCsv(csvData: any[], title: string, filename: string): void {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      title: title,
      filename: `${filename}-${this.dateFormateService.setDateFormate(new Date())}`,
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csvData);
  }
}
