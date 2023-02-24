import { ListingModel } from './category.model';

export interface EventListModel {
  access_ticket_count: number;
  amenitites: ListingModel[];
  categories: ListingModel[];
  business_hours: WorkTimeModel[];
  city: string;
  client_uuid: string;
  description: string;
  end_date: string;
  event_price: EventPrice[];
  event_tags: EventTagsModel[];
  event_timeslots: EventSlot[];
  featured_image: string;
  horizontal_banner_image: string;
  is_banner: boolean;
  is_featured: boolean;
  pincode: string;
  start_date: string;
  state: string;
  status: any;
  tagline: string;
  terms_and_conditions: string;
  title: string;
  uuid: string;
  venue: string;
  vertical_banner_image: string;
  is_published: boolean;
}

export interface WorkTimeModel {
  endTime: string;
  startTime: string;
  workingTime: string;
}

export interface EventDetailsModel {
  access_ticket_count: number;
  amenitites: ListingModel[];
  categories: ListingModel[];
  business_hours: WorkTimeModel[];
  city: string;
  client_uuid: string;
  description: string;
  end_date: string;
  event_price: EventPrice[];
  event_tags: EventTagsModel[];
  event_timeslots: EventSlot[];
  featured_image: string;
  horizontal_banner_image: string;
  is_banner: boolean;
  is_featured: boolean;
  pincode: string;
  start_date: string;
  state: string;
  status: any;
  tagline: string;
  terms_and_conditions: string;
  title: string;
  uuid: string;
  venue: string;
  vertical_banner_image: string;
  is_published: boolean;
}

export class EventPrice {
  category_name: string | undefined;
  price: string | undefined;
  remark: string | undefined;
  uuid?: string;
  is_deleted?: boolean;
  currency: string | undefined;
}

export class EventSlot {
  event_type: number | string | undefined;
  start_time: any;
  end_time: any;
  capacity: number | undefined;
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

export interface HomePageModel {
  banner_event_exist: boolean;
  featured_event_exist: boolean;
}

