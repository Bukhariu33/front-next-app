import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { env } from '@/libs/Env.mjs';

import PlacesSearchInput from './places-search-input';
import MapSkeleton from './skeleton';
import type { Location, OnPlaceChanged } from './type';
import { useCurrentLocation } from './use-current-location';
import { useGoogleService } from './use-google-service';

interface MapProps {
  location?: Location;
  isLoading?: boolean;
  useCurrentLocation?: boolean;
  onPlaceChanged: OnPlaceChanged;
}

const KSA = { lat: 24.67921619141893, lng: 46.68753177673503 }; // Saudi Arabia
const libraries = ['places'];

const Map: FC<MapProps> = ({
  location,
  isLoading,
  useCurrentLocation: enabled,
  onPlaceChanged,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries: libraries as any,
  });

  const [map, setMap] = useState<google.maps.Map | undefined>();
  const [marker, setMarker] = useState<Location | undefined>(location);
  const { placesService } = useGoogleService(map || null, isLoaded);

  const shouldUserFallback =
    !enabled && (!location?.lat || !location?.lng) && !isLoading;

  const onCurrentLocationChange = useCallback(
    (curr: Location) => {
      if (!marker && !location) setMarker(curr);
    },
    [location, marker],
  );

  const { currentLocation } = useCurrentLocation({
    fallback: location,
    onCurrentLocationChange,
    enabled:
      enabled && !isLoading && !location?.lat && !location?.lng
        ? enabled
        : false,
  });

  const getPlaceDetails = (placeId: string, cb: OnPlaceChanged) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (place, status) => {
        if (status === 'OK' && place?.geometry?.location) {
          const placeDetails = {
            location: {
              lat: place?.geometry?.location.lat(),
              lng: place?.geometry?.location.lng(),
            },

            place: {
              address: place?.formatted_address ?? 'N/A',
              addressComponents: place?.address_components ?? [],
              name: place?.name ?? 'N/A',
              placeId,
            },
            _place: place,
          };
          cb(placeDetails);
        }
      },
    );
  };

  const onClick = useCallback(
    function callback(
      e?: google.maps.MapMouseEvent & {
        placeId?: string;
      },
    ) {
      if (e?.latLng && e?.latLng.toString() !== JSON.stringify(marker)) {
        setMarker(e?.latLng.toJSON());
        const placeId = e?.placeId;
        if (placeId) {
          getPlaceDetails(placeId, onPlaceChanged);
        } else {
          onPlaceChanged({
            location: e?.latLng.toJSON(),
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placesService],
  );

  // Update marker when location changes (from parent)
  useEffect(() => {
    if (location?.lat && location?.lng) {
      map?.panTo(location);
      setMarker(location);
    }
  }, [isLoading, location, map]);

  if (isLoaded && !isLoading)
    return (
      <div className="relative h-full  w-full  rounded-xl bg-gray-400">
        <GoogleMap
          zoom={shouldUserFallback ? 10 : 18}
          mapContainerClassName=" min-w-[400px] min-h-[500px] w-full h-full "
          center={shouldUserFallback ? KSA : currentLocation}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
          onLoad={m => setMap(m)}
          onUnmount={() => setMap(undefined)}
          onClick={onClick}
        >
          {/* Markers */}
          {marker && <MarkerF position={marker} />}
          <PlacesSearchInput
            onPlaceChanged={place => {
              map?.panTo(place.location);
            }}
          />
        </GoogleMap>
      </div>
    );
  return <MapSkeleton />;
};

export default Map;
