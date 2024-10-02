package capacitor.quasar.refueltracker.plugins.Database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [Vehicle::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
  abstract fun vehicleDao(): VehicleDao
}

class RefuelTrackerDb(private var applicationContext: Context) {
  private var db : AppDatabase? = null

  fun getContext(): AppDatabase {
    if(db == null)
      db = Room.databaseBuilder(
        applicationContext,
        AppDatabase::class.java, "RefuelTracker.db"
      ).build()
    return db!!
  }
}
