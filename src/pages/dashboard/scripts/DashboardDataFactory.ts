import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from './abstract/AbstractDashboardData'
import { DashboardValueSettings, DashboardValue } from './models'

export class DashboardDataFactory {
  public static dashboardDataClasses = new Map<
    string,
    typeof AbstractDashboardData
  >()

  constructor(private vehicle: Vehicle) {}

  public static register(
    uid: string,
    dashboardDataType: typeof AbstractDashboardData
  ) {
    DashboardDataFactory.dashboardDataClasses.set(uid, dashboardDataType)
  }

  public getAll(dashboardSettings: DashboardValueSettings[]): DashboardValue[] {
    const dashboardData: DashboardValue[] = []
    for (const entry of DashboardDataFactory.dashboardDataClasses.entries()) {
      const uid = entry[0]
      const dashboardDataClass = entry[1]

      if (!uid) continue
      const settings = dashboardSettings.filter(gs => gs.uid === uid)
      if (!settings) continue
      dashboardData.push(
        this.createDashboardData(dashboardDataClass, settings[0]!)
      )
    }
    return dashboardData
  }

  public get(
    uid: string,
    dashboardSettings: DashboardValueSettings
  ): DashboardValue | null {
    const dashboardDataClass =
      DashboardDataFactory.dashboardDataClasses.get(uid)
    if (dashboardDataClass)
      return this.createDashboardData(dashboardDataClass, dashboardSettings)
    return null
  }

  private createDashboardData(
    class_: typeof AbstractDashboardData,
    settings: DashboardValueSettings
  ): DashboardValue {
    const dashboardData: DashboardValue = new class_(this.vehicle)
    dashboardData.id = settings.id ?? 0
    dashboardData.uid = settings.uid
    dashboardData.sequence = settings.sequence
    dashboardData.visible = settings.visible

    return dashboardData
  }
}
