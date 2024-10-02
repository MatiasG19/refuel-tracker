package capacitor.quasar.refueltracker.plugins.Database;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import capacitor.quasar.refueltracker.plugins.FilePicker.FilePicker;

@CapacitorPlugin(name = "Database")
public class DatabasePlugin extends Plugin {
  private FilePicker implementation;

  @Override
  public void load() {
    implementation = new FilePicker(getActivity());
    implementation.GetContentObserver = this::onGetContentResult;
  }

  @PluginMethod
  public void getContent(PluginCall call) {
    String mimeType = call.getString("mimeType");
    implementation.getConent(mimeType);
  }

  public void onGetContentResult(String path) {
    onResult("path", "getContentResult", path);
  }

  private void onResult(String key, String eventName, String data) {
    JSObject ret = new JSObject();
    ret.put(key, data);
    notifyListeners(eventName, ret);
  }
}
