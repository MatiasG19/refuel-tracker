import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { FuelUnit } from '../libraries/refuel/models'
import t from 'src/i18n'

export function getFuelUnits(): FuelUnit[] {
  const settingsStore = useSettingsStore()
  return [
    {
      id: 1,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['kilometersShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['litre'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['litresPer100km'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 2,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['milesShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['gallon'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['mpgUs'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 3,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['milesShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['gallon'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['mpgImperial'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 4,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['kilometersShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['kWh'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['kWhPer100km'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 5,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['kilometersShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['wh'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['whPer100km'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 6,
      distanceUnit: t[settingsStore.locale]['distanceUnits']['milesShort'],
      fuelUnit: t[settingsStore.locale]['fuelUnits']['wh'],
      fuelConsumptionUnit:
        t[settingsStore.locale]['fuelConsumptionsUnits']['whPerMile'],
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    }
  ]
}
