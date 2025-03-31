type StateTypeApiResponse = {
  code: string;
  id: number;
};

type CityTypeApiResponse = {
  id: number;
  name: string;
};

export type LocalTypeApiResponse = {
  lat: string;
  long: string;
  address: string;
  state: StateTypeApiResponse;
  city: CityTypeApiResponse;
};
