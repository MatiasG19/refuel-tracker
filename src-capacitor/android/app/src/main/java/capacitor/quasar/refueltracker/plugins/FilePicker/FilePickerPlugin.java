package capacitor.quasar.refueltracker.plugins.FilePicker;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "FilePicker")
public class FilePickerPlugin extends Plugin {
  private FilePicker implementation;

  @Override
  public void load() {
    implementation = new FilePicker(getActivity());
    implementation.FilePathResultObserver = this::onGetFilePathResult;
    implementation.FilePathResultsObserver = this::onGetFilePathResults;
    implementation.DirPathResultObserver = this::onGetDirPathResult;
  }

  @PluginMethod
  public void pickFile(PluginCall call) {
    String mimeType = call.getString("mimeType");
    implementation.pickFile(mimeType);
  }

  @PluginMethod
  public void pickFiles(PluginCall call) {
    String mimeType = call.getString("mimeType");
    implementation.pickFiles(mimeType);
  }

  @PluginMethod
  public void pickDir(PluginCall call) {
    implementation.pickDir();
  }

  public void onGetFilePathResult(String path) {
    onResult("path", "filePathResult", path);
  }

  public void onGetFilePathResults(String paths) {
    onResult("paths", "filePathResults", paths);
  }

  public void onGetDirPathResult(String path) {
    onResult("path", "dirPathResult", path);
  }

  private void onResult(String key, String eventName, String data) {
    JSObject ret = new JSObject();
    ret.put(key, data);
    notifyListeners(eventName, ret);
  }
}
