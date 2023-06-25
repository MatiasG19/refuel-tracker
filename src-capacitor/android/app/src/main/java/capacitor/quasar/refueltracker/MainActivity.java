package capacitor.quasar.refueltracker;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

import capacitor.quasar.refueltracker.plugins.FilePicker.FilePickerPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(FilePickerPlugin.class);
    super.onCreate(savedInstanceState);
  }



}
