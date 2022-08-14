import { Vehicle } from '../models'

export interface IGraphData {
  calculateValue(vehicle: Vehicle): number
  getUnit(vehicle: Vehicle): string
}
