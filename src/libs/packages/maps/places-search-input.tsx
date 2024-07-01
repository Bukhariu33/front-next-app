import {
  Loader,
  Menu,
  MenuDropdown,
  MenuLabel,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useClickOutside, useResizeObserver } from '@mantine/hooks';
import { useGoogleMap } from '@react-google-maps/api';
import { useTranslation } from 'next-i18next';
import type { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@/libs/icons/search-icon';

import styles from './skeleton.module.css';
import type { OnPlaceChanged, Prediction } from './type';
import { useGoogleService } from './use-google-service';
import { debounce } from './utils/debounce';

interface PlacesSearchInputProps {
  onPlaceChanged: OnPlaceChanged;
}

const PlacesSearchInput: FC<PlacesSearchInputProps> = ({ onPlaceChanged }) => {
  const map = useGoogleMap();
  const [ref, { width }] = useResizeObserver();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { autocompleteService, placesService } = useGoogleService(map, !!map);

  const [searchResult, setSearchResult] = useState<{
    autocompleteSuggestions: Prediction[] | null;
    status: string;
  }>({
    autocompleteSuggestions: [],
    status: '',
  });

  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [],
  );

  const handleSearchResult = (
    predictions: Prediction[] | null,
    status: string,
  ) => {
    setIsOpen(true);
    setSearchResult({ autocompleteSuggestions: predictions, status });
  };
  const getPlaceDetails = (placeId: string, cb: OnPlaceChanged) => {
    placesService?.getDetails(
      {
        placeId,
        fields: ['geometry'],
      },
      (place, status) => {
        if (status === 'OK' && place?.geometry?.location) {
          const { location } = place.geometry;

          const placeDetails = {
            location: {
              lat: location.lat(),
              lng: location.lng(),
            },
          };
          cb(placeDetails);
        }
      },
    );
  };

  const search: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;
    if (!value)
      return setSearchResult({ autocompleteSuggestions: [], status: '' });

    setIsLoading(true);

    return autocompleteService?.getPlacePredictions(
      { input: value, sessionToken },
      (predictions, status) => handleSearchResult(predictions, status),
    );
  };

  useEffect(() => {
    if (searchResult.status) setIsLoading(false);
  }, [searchResult]);

  const { t } = useTranslation('common');
  const menuRef = useClickOutside(() => setIsOpen(false));

  const handleSelectPlace = (prediction: Prediction) => {
    getPlaceDetails(prediction.place_id, onPlaceChanged);
    setIsOpen(false);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      const prediction = searchResult.autocompleteSuggestions?.[0];
      if (prediction?.place_id) {
        handleSelectPlace(prediction);
      }
    }
  };

  return (
    <div
      ref={ref}
      className="absolute left-5 top-5 z-50 w-1/3 shadow-sm rtl:right-5  md:top-10 "
    >
      <Menu
        opened={!!(isOpen && searchResult.autocompleteSuggestions?.length)}
        onChange={setIsOpen}
        offset={5}
        position="bottom"
        width={width}
      >
        <Menu.Target ref={menuRef}>
          <TextInput
            type="search"
            placeholder={t('searchForPlace')}
            classNames={{ input: styles['search-input'] }}
            onKeyDown={handleEnter}
            rightSection={
              isLoading ? (
                <Loader size="xs" />
              ) : (
                <ThemeIcon bg="none" size="sm">
                  <SearchIcon />
                </ThemeIcon>
              )
            }
            onChange={debounce(search, 500)}
          />
        </Menu.Target>
        <MenuDropdown>
          <MenuLabel>{t('places')}</MenuLabel>
          {searchResult.autocompleteSuggestions?.map(prediction => (
            <Menu.Item
              key={prediction.place_id}
              onClick={() => {
                handleSelectPlace(prediction);
              }}
            >
              {prediction.description}
            </Menu.Item>
          ))}
        </MenuDropdown>
      </Menu>
    </div>
  );
};

export default PlacesSearchInput;
