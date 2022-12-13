import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component {

  cdnURL = environment.BASE_URL;
  constructor(private router: Router) { }

  goTOBack(): void {
    this.router.navigate(['/']);
  }

}
