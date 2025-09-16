import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { DataSource } from 'typeorm'

const sqliteConnection = new SQLiteConnection(CapacitorSQLite)

const refuelTrackerDataSource = new DataSource({
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'refuel_tracker_db',
  synchronize: false,
  logging: ['error', 'query', 'schema']
})

try {
  await refuelTrackerDataSource.initialize()
  console.log('Data Source has been initialized!')
} catch (error) {
  console.error('Error during Data Source initialization', error)
}

export default refuelTrackerDataSource
