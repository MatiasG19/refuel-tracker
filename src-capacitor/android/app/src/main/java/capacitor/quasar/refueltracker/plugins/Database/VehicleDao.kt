package capacitor.quasar.refueltracker.plugins.Database

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface VehicleDao {
  @Insert
  fun insert(vehicle: Vehicle)

  @Update
  fun update(vehicle: Vehicle)

  @Delete
  fun delete(vehicle: Vehicle)

  @Query("select * from vehicle")
  fun getAll(): List<Vehicle>
}
