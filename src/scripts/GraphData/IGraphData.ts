import { Vehicle } from '../models'

export interface IGraphData {
  calculateValue(vehicle: Vehicle): string
  getUnit(vehicle: Vehicle): string
}
