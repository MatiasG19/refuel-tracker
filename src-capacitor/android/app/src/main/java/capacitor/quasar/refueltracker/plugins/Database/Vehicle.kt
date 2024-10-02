package capacitor.quasar.refueltracker.plugins.Database

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey
import java.sql.Date

@Entity (foreignKeys = [
  ForeignKey(entity =  Vehicle::class, parentColumns = arrayOf("fuelUnitId"),
    childColumns = arrayOf("vehicleId"),
    onUpdate = ForeignKey.NO_ACTION,
    onDelete = ForeignKey.NO_ACTION
  )
])
data class Vehicle(
  @PrimaryKey(autoGenerate = true)
  val id: String,
  val name: String,
  val plateNumber: String,
  val currencyUnit: String,
  val fuelUnitId: Int,
//  val fuelUnit: FuelUnit?,
  val refuels: Refuel?,
  val totalFuelConsumption: String?
)

@Entity (foreignKeys = [
  ForeignKey(entity =  Vehicle::class, parentColumns = arrayOf("vehicleId"),
    childColumns = arrayOf("vehicleId"),
    onUpdate = ForeignKey.NO_ACTION,
    onDelete = ForeignKey.CASCADE
  )
])
data class Refuel(
  @PrimaryKey(autoGenerate = true)
  val id: Int,
  val date: Date,
  val refueledAmount: Int,
  val payedAmount: Int,
  val distanceDriven: Int,
  val vehicleId: Int,
//  val vehicle: Vehicle?
)

@Entity
data class FuelUnit(
  @PrimaryKey(autoGenerate = true)
  val id: Int,
  val distanceUnit: String,
  val fuelUnit: String,
  val fuelConsumptionUnit: String,
  val distanceConversion: Int,
  val fuelUnitConversion: Int
)
