export type City = {
  city_id: number;
  city_name: string;
};

export type Zone = {
  zone_id: number;
  zone_name: string;
};

export type Area = {
  area_id: number;
  area_name: string;
  home_delivery_available: boolean;
  pickup_available: boolean;
};

export type AddressSuggestion = {
  message: string;
  type: string;
  code: number;
  data: {
    hub_id: number | null;
    hub_name: string | null;
    area_id: number | null;
    area_name: string | null;
    zone_id: number | null;
    zone_name: string | null;
    is_implicit: boolean;
    district_id: number | null;
    district_name: string | null;
    score: number | null;
    debug_info: any | null;
  };
};

export type AddressField = {
  id?: string | number | null;
  val?: string | null | undefined;
};

export type CustomerAddress = {
  city?: AddressField;
  zone?: AddressField;
  area?: AddressField;
};
