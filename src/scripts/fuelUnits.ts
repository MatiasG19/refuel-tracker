import { FuelUnit } from './models'

export function fuelUnits(): FuelUnit[] {
  return [
    {
      uid: '1',
      distanceUnit: 'km',
      fuelUnit: 'Litres',
      fuelConsumptionUnit: 'L/100km',
      conversion: 1.0
    },
    {
      uid: '2',
      distanceUnit: 'Miles',
      fuelUnit: 'Gallons',
      fuelConsumptionUnit: 'MPG US',
      conversion: 1.0
    },
    {
      uid: '3',
      distanceUnit: 'Miles',
      fuelUnit: 'Gallons',
      fuelConsumptionUnit: 'MPG Imperial',
      conversion: 1.0
    },
    {
      uid: '4',
      distanceUnit: 'km',
      fuelUnit: 'kWh',
      fuelConsumptionUnit: 'kWh/100km',
      conversion: 1.0
    },
    {
      uid: '5',
      distanceUnit: 'km',
      fuelUnit: 'Wh',
      fuelConsumptionUnit: 'Wh/km',
      conversion: 1.0
    },
    {
      uid: '6',
      distanceUnit: 'Miles',
      fuelUnit: 'Wh',
      fuelConsumptionUnit: 'Wh/mile',
      conversion: 1.0
    }
  ]
}
