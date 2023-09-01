import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
}) export class AppComponent implements OnInit {
  // @ViewChild(VcHostDirective, { static: true }) vcHost!: VcHostDirective;

  constructor(
    private utilityService: UtilityService,
    // private service: VcSnackbarService,
    // private viewContainerRef: ViewContainerRef,
    // private appRef: ApplicationRef,
    // private el: ElementRef,
  ) {
    // this.service.setRootViewContainerRef(this.viewContainerRef, this.appRef, this.el)
  }

  ngOnInit(): void {
    this.utilityService.setLanguage();
  }

}
