export interface UserType {
  access_token: string;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  expires_at: number;
}

export interface ActivityShortType {
  id: string;
  kudos_count: number;
  name: string;
  distance: number;
  average_heartrate: string;
  average_speed: number;
  moving_time: number;
  elapsed_time: number;
  map: any;
  gear_id: number;
  external_id: number;
  start_date: Date;
  start_date_local: Date;
  utc_offset: number;
  timezone: string;
  visibility: string;
  private: boolean;
  suffer_score: number;
}
