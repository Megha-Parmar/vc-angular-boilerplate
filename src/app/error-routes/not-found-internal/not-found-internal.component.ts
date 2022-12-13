import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-internal',
  templateUrl: './not-found-internal.component.html',
  styleUrls: ['./not-found-internal.component.scss']
})
export class NotFoundInternalComponent {

  cdnURL = environment.BASE_URL;
  constructor(private router: Router) { }

  goTOBack(): void {
    this.router.navigate(['/']);
  }

}
