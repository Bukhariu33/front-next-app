import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

import { env } from '@/libs/Env.mjs';

import MapSkeleton from './skeleton';
import type { Location } from './type';

interface Props {
  location?: Location;
}

function ViewOnlyMap({ location }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });
  if (isLoaded && location)
    return (
      <div className="relative h-full  w-full  rounded-xl bg-gray-400">
        <GoogleMap
          zoom={18}
          mapContainerClassName=" min-w-[400px] min-h-[500px] w-full h-full "
          center={location}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* Markers */}
          <MarkerF
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
          />
        </GoogleMap>
      </div>
    );
  return <MapSkeleton />;
}

export default ViewOnlyMap;
