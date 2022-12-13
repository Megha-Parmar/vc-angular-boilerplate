import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  cdnURL = environment.BASE_URL;
  constructor(private router: Router) { }

  goTOBack(): void {
    this.router.navigate(['/']);
  }

}
