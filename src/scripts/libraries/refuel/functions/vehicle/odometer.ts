import { Vehicle } from '../../models'
import { vehicleDistanceDriven } from './distanceDriven'

export function vehicleOdometer(vehicle: Vehicle): number {
  if (!vehicle.refuels || vehicle.refuels.length === 0) return vehicle.odometer

  return vehicleDistanceDriven(vehicle) + vehicle.odometer
}
