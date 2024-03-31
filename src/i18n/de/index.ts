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
        cancel: 'Abbrechen',
        confirm: 'Bestätigen'
      }
    }
  },
  form: {
    cancel: 'Abbrechen',
    confirm: 'Bestätigen'
  },
  layouts: {
    main: {
      graphs: 'Graphen',
      vehicles: 'Fahrzeuge',
      refuels: 'Betankungen',
      settings: 'Einstellungen',
      helpAndSupport: 'Hilfe und Support'
    }
  },
  pages: {
    vehicles: {
      vehicles: {
        title: 'Fahrzeuge',
        addVehicle: 'Fahrzeug hinzufügen',
        optionsDialog: {
          showRefuels: 'Betankungen anzeigen',
          edit: 'Editieren',
          delete: 'Löschen',
          deleteVehicle: 'Fahrzeug löschen?',
          deletingVehicle: 'Fahrzeug wird gelöscht'
        }
      },
      vehicleForm: {
        vehicleName: 'Fahrzeugname',
        licensePlate: 'Kennzeichen',
        fuelUnit: 'Kraftstoffeinheit',
        currencyUnit: 'Währung',
        titleAddVehicle: 'Fahrzeug hinzufügen',
        titleEditVehicle: 'Fahrzeug editieren'
      }
    },
    settings: {
      title: 'Einstellungen',
      sections: {
        settings: {
          title: 'Einstellungen',
          language: 'Sprache',
          colorTheme: 'Farbthema',
          licensePlateInTitle: 'Kennzeichen im Titel anzeigen'
        },
        backup: {
          title: 'Backup',
          autoBackup: 'Autobackup',
          autoBackupFolder: 'Autobackup Ordner',
          change: 'Ändern',
          export: 'Exportieren',
          import: 'Importieren'
        }
      }
    },
    support: {
      title: 'Hilfe und Unterstützung',
      greetingPart1: 'Danke',
      greetingPart2: 'fürs Benutzen des',
      greetingPart3: '! Ich hoffe Dir gefällt die App soweit',
      slide1: 's Code ist open source! Schaue mal rein!',
      slide2: 'Du hast Problem oder Verbesserungsideen?',
      slide3: 'Gefällt Dir das  Projekt? Schenke einen Stern!',
      slide4:
        'Bewerte die App oder hinterlasse Feedback, um die App zu verbessern!',
      version: 'Version',
      btnLicense: 'Lizenz auf GitHub einsehen'
    }
  }
}
