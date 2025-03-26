package capacitor.quasar.refueltracker;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

import capacitor.quasar.refueltracker.plugins.FilePicker.FilePickerPlugin;
import capacitor.quasar.refueltracker.plugins.themesetter.ThemeSetterPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(FilePickerPlugin.class);
    registerPlugin(ThemeSetterPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
