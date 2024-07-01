import { useEffect, useState } from 'react';

interface Props {
  fallback?: google.maps.LatLngLiteral;
  onCurrentLocationChange?: (location: google.maps.LatLngLiteral) => void;
  enabled?: boolean;
}
export const useCurrentLocation = ({
  fallback,
  onCurrentLocationChange,
  enabled,
}: Props) => {
  const [currentLocation, setCurrentLocation] = useState<
    google.maps.LatLngLiteral | undefined
  >(); // [lat, lng]

  useEffect(() => {
    if (!enabled) return;
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        onCurrentLocationChange?.({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setCurrentLocation(fallback);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { currentLocation };
};
