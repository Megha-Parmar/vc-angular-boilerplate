import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonEventService {
  sidebarOverlay = new BehaviorSubject(false);


  isMobileDevice(): boolean {
    let isMobile: boolean = false;
    if (window.innerWidth < 991) {
      document.body.classList.add('responsive-device');
      isMobile = true;
    }
    return isMobile;
  }
}
