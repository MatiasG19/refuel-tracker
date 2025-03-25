package capacitor.quasar.refueltracker.plugins.themesetter;

import android.os.Build;
import android.view.Window;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.core.view.WindowCompat;
import capacitor.quasar.refueltracker.R;

public class ThemeSetter {
  private final AppCompatActivity app;

  public ThemeSetter(AppCompatActivity activity) {
    this.app = activity;
  }

  public void setTheme(int themeId) {
    switch (themeId) {
      case 0:
        changeTheme(R.style.AppTheme);
        break;
      case 1:
        changeTheme(R.style.Theme_Light);
        break;
      case 2:
        changeTheme(R.style.Theme_Dark);
        break;
    }
  }

  public void changeTheme(int themeId) {
    app.runOnUiThread(() -> {
      Window window = app.getWindow();
      WindowInsetsControllerCompat windowInsetsControllerCompat = WindowCompat.getInsetsController(window, window.getDecorView());
      if(themeId == R.style.Theme_Light) {
        windowInsetsControllerCompat.setAppearanceLightNavigationBars(true);
        windowInsetsControllerCompat.setAppearanceLightStatusBars(true);
        if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
          window.setNavigationBarColor(ContextCompat.getColor(app.getApplicationContext(), R.color.colorPrimary_light));
      }
      else if(themeId == R.style.Theme_Dark) {
        windowInsetsControllerCompat.setAppearanceLightNavigationBars(false);
        windowInsetsControllerCompat.setAppearanceLightStatusBars(false);
        if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
          window.setNavigationBarColor(ContextCompat.getColor(app.getApplicationContext(), R.color.colorPrimary_dark));
      }
      else {
        windowInsetsControllerCompat.setAppearanceLightNavigationBars(false);
        windowInsetsControllerCompat.setAppearanceLightStatusBars(false);
        if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
          window.setNavigationBarColor(ContextCompat.getColor(app.getApplicationContext(), R.color.colorPrimary));
      }
    });
  }
}
