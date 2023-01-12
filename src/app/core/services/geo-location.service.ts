import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor() { }

  getLocationDetails(googleLocation: any): void {
    let city: string;
    let state: string;
    let country: string;
    let pincode: string;
    var location;
    googleLocation.forEach((value: any, index: number) => {
      let types = value.types;
      types.forEach((value2: string) => {
        if (value2 === 'locality') {
          city = googleLocation[index]['long_name'];
        } else if (value2 === 'administrative_area_level_1') {
          state = googleLocation[index]['long_name'];
        } else if (value2 === 'country') {
          country = googleLocation[index]['short_name'];
        } else if (value2 === 'postal_code') {
          pincode = googleLocation[index]['short_name'];
        }
      });
      location = {
        city: city,
        country: country,
        pincode: pincode,
        state: state,
      };
    });
    return location;
  }
}
