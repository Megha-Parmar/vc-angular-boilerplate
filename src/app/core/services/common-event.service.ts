import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonEventService {
  sidebarOverlay = new BehaviorSubject(false);
}
