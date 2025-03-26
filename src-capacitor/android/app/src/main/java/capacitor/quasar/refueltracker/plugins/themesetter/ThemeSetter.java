package capacitor.quasar.refueltracker.plugins.themesetter;

import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.view.View;
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
        changeTheme(R.color.colorPrimary, false);
        break;
      case 1:
        changeTheme(R.color.colorPrimary_light, true);
        break;
      case 2:
        changeTheme(R.color.colorPrimary_dark, false);
        break;
    }
  }

  public void changeTheme(int color, boolean light) {
    app.runOnUiThread(() -> {
      try {
        Window window = app.getWindow();
        WindowInsetsControllerCompat windowInsetsControllerCompat = WindowCompat.getInsetsController(window, window.getDecorView());
        windowInsetsControllerCompat.setAppearanceLightStatusBars(light);
        windowInsetsControllerCompat.setAppearanceLightNavigationBars(light);
        window.setStatusBarColor(ContextCompat.getColor(app.getApplicationContext(), color));
        window.setNavigationBarColor(ContextCompat.getColor(app.getApplicationContext(), color));
      } catch (Exception e) {
        System.out.println("ThemeSetter::Failed to set navigation and status bar color.");
      }
    });
  }
}
