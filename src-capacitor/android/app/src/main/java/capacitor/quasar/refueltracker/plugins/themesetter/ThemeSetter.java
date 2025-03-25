package capacitor.quasar.refueltracker.plugins.themesetter;

import static androidx.core.app.ActivityCompat.recreate;
import androidx.appcompat.app.AppCompatActivity;

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
      case 1:
        changeTheme(R.style.Theme_Light);
      case 2:
        changeTheme(R.style.Theme_Dark);
    }
  }

  public void changeTheme(int themeId) {
    setTheme(themeId);
    recreate(this.app);
}
}
