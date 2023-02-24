export interface BookingHistory {
  availability: number;
  event_end: string;
  event_name: string;
  event_start: string;
  event_uuid: string;
  sold_tickets: number;
  ticket_from_pos: number;
  ticket_from_web: number;
  total_amount: number;
  total_bookings: number;
}
