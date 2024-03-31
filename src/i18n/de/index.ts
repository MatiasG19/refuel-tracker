export default {
  periods: {
    week: 'Woche',
    threeMonths: '3 Monate',
    sixMonths: '6 Monate',
    year: 'Jahr',
    max: 'Max'
  },
  distanceUnits: {
    kilometersShort: 'km',
    milesShort: 'mi'
  },
  fuelUnits: {
    litre: 'Liter',
    gallon: 'Gallonen',
    kWh: 'kWh',
    wh: 'Wh'
  },
  fuelConsumptionsUnits: {
    litresPer100km: 'L/100km',
    mpgUs: 'MPG US',
    mpgImperial: 'MPG Imperial',
    kWhPer100km: 'kWh/100km',
    whPer100km: 'Wh/100km',
    whPerMile: ' Wh/Mile'
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
    confirm: 'Bestätigen',
    filter: 'Filtern'
  },
  placeholders: {
    addRefuel: 'Betankung hinzufügen',
    addVehicle: 'Fahrzeug hinzufügen'
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
    graphData: {
      distanceDriven: 'Gefahrene Distanz',
      fuelBurnt: 'Verbrauchter Kraftstoff',
      fuelConsumption: 'Verbrauch',
      fuelPricing: 'Kraftstoffpreis',
      moneySpent: 'Ausgegebenes Geld',
      refuelsMade: 'Anzahl Betankungen',
      optionsInDialog: {
        moveTop: 'Ganz nach oben',
        moveUp: 'Eins höher',
        moveDown: 'Eins tiefer',
        moveBottom: 'Ganz nach unten'
      }
    },
    refuels: {
      refuels: {
        title: 'Betankungen',
        optionsDialog: {
          edit: 'Editieren',
          delete: 'Löschen',
          deleteRefuel: 'Eintrag löschen?',
          deletingRefuel: 'Eintrag wird gelöscht'
        }
      },
      refuelsForm: {
        titleAddRefuel: 'Betankung hinzufügen',
        titleEditRefuel: 'Betankung editieren',
        payedAmount: 'Gezahlter Betrag',
        distanceDriven: 'Gefahrene Distanz',
        refueledAmount: 'Getankte Menge',
        refuelDate: 'Datum',
        close: 'Schließen',
        refuelTime: 'Uhrzeit'
      },
      filterRefuelsForm: {
        title: 'Betankungen filtern',
        filterFrom: 'Filtern von',
        filterUntil: 'Filtern bis'
      }
    },
    filterRefuelsForm: {
      title: 'Betankungen filtern',
      filterFrom: 'Filtern von',
      filterTo: 'Filtern bis'
    },
    vehicles: {
      vehicles: {
        title: 'Fahrzeuge',
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
      greetingPart2: 'fürs Benutzen von',
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
