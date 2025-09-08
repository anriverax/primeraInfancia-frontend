import { showToast } from "@/shared/utils/funtions";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

const useCurrentLocation = () => {
  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        showToast("La geolocalización no está soportada en este navegador", "danger");
        reject("Geolocalización no soportada");
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          resolve(locationData);
        },
        (error) => {
          showToast("Error desconocido", "danger");
          reject(error);
        },
        options
      );
    });
  };

  return getCurrentLocation;
};

export { useCurrentLocation };
