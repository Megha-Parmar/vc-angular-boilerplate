export interface BookingModel {
  booking_id: string;
  customer_email: string;
  customer_name: string;
  customer_phone_number: string;
  event_name: string;
  time_slots_endtime: string;
  time_slots_starttime: string;
}

export interface TableModel<T> {
  items: T;
  page: number;
  size: number;
  total: number;
}
