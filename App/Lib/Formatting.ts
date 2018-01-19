export const formatVehicleId =
  (vin: string): string => vin.length > 7 ? vin.slice(-7) : vin;
