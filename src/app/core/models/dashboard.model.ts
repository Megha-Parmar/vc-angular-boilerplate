export interface DashboardTilesModel {
  pos_desktop_active_staff: number;
  pos_mobile_active_staff: number;
  total_bookings: number;
  total_events: number;
  total_member: number;
  total_revenue: number;
  total_offline_bookings: number;
  total_online_bookings: number;
  total_revenue_online: number;
  total_revenue_ofline: number;
}

export interface EventReportTiles {
  total_booking_from_pos: number;
  total_booking_from_web: number;
  total_revenue: number;
  totoal_tickets: number;
}

export interface ListingModel {
  checked: boolean;
  icon: string;
  id: number;
  name: string;
  status: boolean;
  uuid: string;
  is_allowed?: boolean;
}

export interface WorkTimeModel {
  endTime: string;
  startTime: string;
  workingTime: string;
}

export class EventPrice {
  category_name: string;
  price: any;
  remark: string;
  uuid?: string;
  is_deleted?: boolean;
  currency: string;
  gst_percentage?: number;
  client_gst_uuid?: string;
}

export class EventSlot {
  event_type: number | string;
  start_time: any;
  end_time: any;
  capacity: number;
  timezone?: string;
  uuid?: string;
  is_deleted?: boolean;
  event_date?: Date | string;
  is_repeat?: boolean;
}

export interface EventTagsModel {
  name: string;
  is_deleted?: boolean;
  uuid?: string;
}