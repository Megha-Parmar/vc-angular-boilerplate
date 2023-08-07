import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockApiService {

    getData(data: any): Observable<any> {
        return of(data);
    }
}