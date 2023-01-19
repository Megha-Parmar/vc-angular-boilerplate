import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  readonly CDN_URL = environment.contentful.CDN_URL;
  constructor(private router: Router) { }

  goTOBack(): void {
    this.router.navigate(['/']);
  }

}
