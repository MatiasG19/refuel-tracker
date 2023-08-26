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
    implementation.GetContentObserver = this::onGetContentResult;
    implementation.GetMultipleContentsObserver = this::onGetMultipleContentsResult;
    implementation.OpenDocumentTreeObserver = this::onOpenDocumentTreeResult;
    implementation.OpenDocumentObserver = this::onOpenDocumentResult;
    implementation.CreateDocumentObserver = this::onCreateDocumentResult;
  }

  @PluginMethod
  public void getContent(PluginCall call) {
    String mimeType = call.getString("mimeType");
    implementation.getConent(mimeType);
  }

  @PluginMethod
  public void getMultipleContents(PluginCall call) {
    String mimeType = call.getString("mimeType");
    implementation.getMultipleContents(mimeType);
  }

  @PluginMethod
  public void openDocumentTree(PluginCall call) {
    implementation.openDocumentTree();
  }

  @PluginMethod
  public void openDocument(PluginCall call) {
    String mimeTypes = call.getString("mimeTypes");
    implementation.openDocument(mimeTypes.split(","));
  }

  @PluginMethod
  public void createDocument(PluginCall call) {
    String mimeType = call.getString("mimeTypes");
    implementation.createDocument(mimeType);
  }

  @PluginMethod
  public void createFile(PluginCall call) {
    String path = call.getString("path");
    String fileName = call.getString("fileName");
    String mimeType = call.getString("mimeType");
    String data = call.getString("data");
    implementation.createFile(path, fileName, mimeType, data);
  }

  public void onGetContentResult(String path) {
    onResult("path", "getContentResult", path);
  }

  public void onGetMultipleContentsResult(String paths) {
    onResult("paths", "getMultipleContentsResult", paths);
  }

  public void onOpenDocumentTreeResult(String path) {
    onResult("path", "openDocumentTreeResult", path);
  }

  public void onOpenDocumentResult(String path) {
    onResult("path", "openDocumentResult", path);
  }

  public void onCreateDocumentResult(String path) {
    onResult("path", "createDocumentResult", path);
  }

  private void onResult(String key, String eventName, String data) {
    JSObject ret = new JSObject();
    ret.put(key, data);
    notifyListeners(eventName, ret);
  }
}
