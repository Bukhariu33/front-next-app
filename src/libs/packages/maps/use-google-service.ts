export const useGoogleService = (
  map: google.maps.Map | null,
  isLoaded: boolean,
) => {
  const { google } = window;

  const placesService = isLoaded
    ? new google.maps.places.PlacesService(map || document.createElement('div'))
    : null;

  return {
    autocompleteService: isLoaded
      ? new google.maps.places.AutocompleteService()
      : null,

    placesService,
  };
};
