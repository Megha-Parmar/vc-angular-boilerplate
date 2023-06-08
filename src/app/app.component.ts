import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vc angular boilerplate';

  constructor(
    private utilityService: UtilityService
  ) {}

  /**
   * The ngOnInit function sets the language using the utility service.
   */
  ngOnInit(): void {
    this.utilityService.setLanguage();
  }

}
