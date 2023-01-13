import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {

  constructor() { }

  getDateFormat(date: Date): any {
    const Dt = new Date(date);
    Dt.setHours(23);
    Dt.setMinutes(59);
    if (Dt) {
      return new Date(Dt).toISOString().substring(0, 10);
    }
  }

  getTimeFormat(UTCTime: Date | string): string {
    const newFormat = new Date(String(UTCTime));
    const hours = newFormat.getHours();
    const minutes = newFormat.getMinutes();
    return this.addLeadingZero(hours) + ':' + this.addLeadingZero(minutes) + ':' + '00';
  }

  addLeadingZero(digit: number) {
    return ('0' + digit).slice(-2);
  }

  convertTimetoDateFormat(time: string, date?: any): Date {
    let currentTime = new Date();
    const stringValue = time;
    const timeValue = stringValue.split(':');
    if (date) {
      currentTime = new Date(date);
    }
    currentTime.setHours(Number(timeValue[0]), Number(timeValue[1]));
    const setTime = new Date(currentTime);
    return setTime;
  }

  isDateTimeIsSame(startTime: any, endTime: any, date: any, slotList: any[]): boolean {
    let isSame = false;
    const currentSlotDate = (new Date(date)).getTime();
    const currentSlotStartTime = this.convertTimetoDateFormat(startTime, date).getTime();
    const currentSlotEndTime = this.convertTimetoDateFormat(endTime, date).getTime();

    slotList.filter(s => {
      const dateCount = (new Date(s.event_date)).getTime();
      if (currentSlotDate && dateCount === currentSlotDate) {
        if (this.isTimeSame(s.start_time, s.end_time, currentSlotStartTime, currentSlotEndTime, s.event_date)) {
          isSame = true;
        }
      }
      else {
        if (this.isTimeSame(s.start_time, s.end_time, currentSlotStartTime, currentSlotEndTime)) {
          isSame = true;
        }
      }
    })
    return isSame;
  }

  isTimeSame(start: any, end: any, currentStart: any, currentEnd: any, date?: any): boolean {
    let isSame = false;
    const slotStartTime = this.convertTimetoDateFormat(start, date).getTime();
    const slotEndTime = this.convertTimetoDateFormat(end, date).getTime();
    if (currentStart >= slotStartTime && currentEnd <= slotEndTime) {
      isSame = true
    }
    return isSame;
  }


  convertTimetoDate(date: string): Date {
    const setTime = this.convertTimetoDateFormat(date);
    return setTime;
  }

}
