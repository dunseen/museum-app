type StateTypeApiResponse = {
    code: string;
      id: number;
}

type CityTypeApiResponse = {
    id: number;
    name: string;
}

export type LocalTypeApiResponse = {
    lat: number;
    long: number;
    address: string;
    state: StateTypeApiResponse;
    city: CityTypeApiResponse
};
  