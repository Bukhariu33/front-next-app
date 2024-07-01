export type Location = google.maps.LatLngLiteral;
export type Prediction = google.maps.places.AutocompletePrediction;
export type Place = {
  name: string;
  address: string;
  placeId: string;
  addressComponents: google.maps.places.PlaceResult['address_components'];
};
export type OnPlaceChanged = ({
  location,
  place,
}: {
  location: Location;
  place?: Place;
  _place?: google.maps.places.PlaceResult;
}) => void;
