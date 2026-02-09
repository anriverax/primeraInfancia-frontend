import { showToast } from "@/shared/utils/functions";

/**
 * Data returned by the Geolocation API.
 *
 * - latitude and longitude are in decimal degrees.
 * - accuracy is given in meters and represents the estimated radius of uncertainty.
 * - timestamp is a DOMHighResTimeStamp (milliseconds since epoch) when the position was captured.
 */
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

/**
 * Hook that returns a function to obtain the user's current location.
 *
 * Contract:
 * - Input: none
 * - Output: async function getCurrentLocation(): Promise<LocationData>
 * - Errors: the promise rejects with an Error when permissions are denied, timeout occurs or the position is unavailable.
 *
 * Important notes:
 * - The browser will request permission the first time this is invoked; the user must grant permission to obtain location.
 * - On failures, a toast is displayed via `showToast` to provide immediate user feedback.
 * - Geolocation options request high accuracy, with a 10s timeout and a 60s maximum cached age.
 *
 * Example usage:
 *
 * const getCurrentLocation = useCurrentLocation();
 * try {
 *   const { latitude, longitude, accuracy, timestamp } = await getCurrentLocation();
 *   // use the location
 * } catch (err) {
 *   // handle the error (a toast has already been shown to the user)
 * }
 *
 * Edge cases / Considerations:
 * - If `navigator.geolocation` is not available, the promise rejects and a toast is shown.
 * - If the user denies permission, the promise rejects with an Error and a clear message is shown.
 * - If the API exceeds the 10s timeout, the promise rejects with a TIMEOUT error.
 */
const useCurrentLocation = (): (() => Promise<LocationData>) => {
  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Immediate feedback to the user and rejection of the promise
        showToast("La geolocalización no está soportada en este navegador", "danger");
        reject(new Error("Geolocalización no soportada"));
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
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
        (error: GeolocationPositionError) => {
          // Default message
          let message = "Error desconocido";
          // 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
          if (error && typeof error.code === "number") {
            switch (error.code) {
              case 1:
                message =
                  "Permiso denegado para geolocalización. Por favor habilite los permisos del navegador.";
                break;
              case 2:
                message = "No se pudo obtener la ubicación. Verifique la señal o inténtelo más tarde.";
                break;
              case 3:
                message = "Tiempo de espera agotado al obtener la ubicación. Intente nuevamente.";
                break;
              default:
                message = "Error desconocido al obtener la ubicación.";
            }
          }

          // Display feedback to the user and reject with Error
          showToast(message, "danger");
          reject(new Error(message));
        },
        options
      );
    });
  };

  return getCurrentLocation;
};

export { useCurrentLocation };
