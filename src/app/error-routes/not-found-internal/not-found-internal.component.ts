import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not-found-internal',
  standalone: true,
  templateUrl: './not-found-internal.component.html',
  styleUrls: ['./not-found-internal.component.scss']
})
export class NotFoundInternalComponent {

  readonly CDN_URL = environment.contentful.CDN_URL;
  constructor(private router: Router) { }

  goTOBack(): void {
    this.router.navigate(['/']);
  }

}
