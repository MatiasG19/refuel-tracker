import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { DataSource } from 'typeorm'

// const refuelTrackerDataSource = new DataSource({
//   type: 'capacitor',
//   driver: new SQLiteConnection(CapacitorSQLite),
//   database: 'refuel_tracker_db',
//   synchronize: false,
//   logging: ['error', 'query', 'schema']
// })

const refuelTrackerDataSource = new DataSource({
  type: 'sqlite',
  driver: new SQLiteConnection(),
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
