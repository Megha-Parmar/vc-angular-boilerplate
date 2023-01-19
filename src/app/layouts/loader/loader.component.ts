import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  readonly CDN_URL = environment.contentful.CDN_URL;
  isLoaderEnabled$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) { }
}
