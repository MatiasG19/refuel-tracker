package capacitor.quasar.refueltracker.plugins.themesetter;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ThemeSetter")
public class ThemeSetterPlugin extends Plugin {
  private ThemeSetter implementation;

  @Override
  public void load() {
    implementation = new ThemeSetter(getActivity());
  }

  @PluginMethod
  public void setTheme(PluginCall call) {
    int themeId = call.getInt("themeId");
    implementation.setTheme(themeId);
  }
}
