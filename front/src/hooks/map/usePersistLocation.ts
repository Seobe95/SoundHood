import { LatLng } from '@/hooks/map/useLocation.ts';
import { getEncryptedStorage, storeEncryptedStorage } from '@/utils';
import { storageKeys } from '@/constants';

function usePersistLocation() {
  const getPersistLocation = async (): Promise<
    (LatLng & { zoom: number }) | null
  > => {
    const location = await getEncryptedStorage<LatLng & { zoom: number }>(
      storageKeys.LOCATION,
    );
    if (location) {
      return location;
    }
    return null;
  };

  const storeCurrentLocation = async (location: LatLng & { zoom: number }) => {
    try {
      await storeEncryptedStorage(storageKeys.LOCATION, location);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    getPersistLocation,
    storeCurrentLocation,
  };
}

export default usePersistLocation;
