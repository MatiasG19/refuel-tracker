package capacitor.quasar.refueltracker;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;


import com.getcapacitor.BridgeActivity;

import capacitor.quasar.refueltracker.plugins.FilePicker.FilePickerPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(FilePickerPlugin.class);
    super.onCreate(savedInstanceState);
  }



}
