import { defineCapacitorConfig } from "@quasar/app-vite/capacitor";

export default defineCapacitorConfig({
  appId: "capacitor.quasar.refueltracker",
  appName: "Refuel Tracker",
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_launcher",
      iconColor: "#6E6B9D",
      sound: "",
    },
    SplashScreen: {
      launchAutoHide: false,
    },
    EdgeToEdge: {
      backgroundColor: "#ffffff",
    },
  },
});
