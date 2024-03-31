export default {
  periods: {
    week: 'Week',
    threeMonths: '3 Months',
    sixMonths: '6 Months',
    year: 'Year',
    max: 'Max'
  },
  distanceUnits: {
    kilometersShort: 'km',
    milesShort: 'mi'
  },
  fuelUnits: {
    litre: 'Litre',
    gallon: 'Gallon',
    kWh: 'kWh',
    wh: 'Wh'
  },
  fuelConsumptionsUnits: {
    litresPer100km: 'L/100km',
    mpgUs: 'MPG US',
    mpgImperial: 'MPG Imperial',
    kWhPer100km: 'kWh/100km',
    whPer100km: 'Wh/100km',
    whPerMile: ' Wh/mile'
  },
  components: {
    dialogs: {
      confirmDialog: {
        cancel: 'Cancel',
        confirm: 'Confirm'
      }
    }
  },
  form: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    filter: 'Filtern'
  },
  layouts: {
    main: {
      graphs: 'Graphs',
      vehicles: 'Vehicles',
      refuels: 'Refuels',
      settings: 'Settings',
      helpAndSupport: 'Help and Support'
    }
  },
  pages: {
    refuels: {
      refuels: {
        title: 'Refuels'
      },
      refuelsForm: {
        titleAddRefuel: 'Add refuel',
        titleEditRefuel: 'Edit refuel',
        payedAmount: 'Payed amount',
        distanceDriven: 'Distance driven',
        refueledAmount: 'Refueled amount',
        refuelDate: 'Refuel date',
        close: 'Close',
        refuelTime: 'Refuel time'
      },
      filterRefuelsForm: {
        title: 'Filter refuels',
        filterFrom: 'Filter from',
        filterUntil: 'Filter until'
      }
    },
    vehicles: {
      vehicles: {
        title: 'Vehicles',
        addVehicle: 'Add vehicle',
        optionsDialog: {
          showRefuels: 'Show refuels',
          edit: 'Edit',
          delete: 'Delete',
          deleteVehicle: 'Delete vehicle?',
          deletingVehicle: 'Deleting vehicle'
        }
      },
      vehicleForm: {
        vehicleName: 'Vehicle name',
        licensePlate: 'License plate',
        fuelUnit: 'Fuel unit',
        currencyUnit: 'Currency',
        titleAddVehicle: 'Add vehicle',
        titleEditVehicle: 'Edit vehicle'
      }
    },
    settings: {
      title: 'Settings',
      sections: {
        settings: {
          title: 'Settings',
          language: 'Language',
          colorTheme: 'Color theme',
          licensePlateInTitle: 'Show license plate in title'
        },
        backup: {
          title: 'Backup',
          autoBackup: 'Auto backup',
          autoBackupFolder: 'Auto backup folder',
          change: 'Change',
          export: 'Export',
          import: 'Import'
        }
      }
    },
    support: {
      title: 'Help and Support',
      greetingPart1: 'Thank you',
      greetingPart2: 'for using',
      greetingPart3: '! I hope you have been enjoying the app so far',
      slide1: "'s code is open source! Check it out!",
      slide2: 'Having issues or improvement ideas?',
      slide3: 'Like the project? Leave a star!',
      slide4:
        'Rate this app if you like it or leave feedback to improve your experience!',
      version: 'version',
      btnLicense: 'View license on GitHub'
    }
  }
}
