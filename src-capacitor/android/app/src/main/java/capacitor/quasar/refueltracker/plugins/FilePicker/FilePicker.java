package capacitor.quasar.refueltracker.plugins.FilePicker;

import android.net.Uri;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.documentfile.provider.DocumentFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class FilePicker {
  public IFilePathObserver GetContentObserver;
  public IFilePathObserver GetMultipleContentsObserver;
  public IFilePathObserver OpenDocumentTreeObserver;
  public IFilePathObserver OpenDocumentObserver;
  public IFilePathObserver CreateDocumentObserver;

  private final ActivityResultLauncher<String> getContentActivityLauncher;
  private final ActivityResultLauncher<String> getMultipleContentsActivityLauncher;
  private final ActivityResultLauncher<Uri> openDocumentTreeActivityLauncher;
  private final ActivityResultLauncher<String> createDocumentActivityLauncher;
  private final ActivityResultLauncher<String[]> openDocumentActivityLauncher;

  private final AppCompatActivity app;

  public FilePicker(AppCompatActivity activity) {

    this.app = activity;
    // Get content
    getContentActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.GetContent(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
          GetContentObserver.update(uri.toString());
        }
      });
    // Get multiple contents
    getMultipleContentsActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.GetMultipleContents(),
      new ActivityResultCallback<List<Uri>>() {
        @Override
        public void onActivityResult(List<Uri> uris) {
          String paths = "";
          for (int i = 0; i < uris.size(); i++) {
            if (i == 0)
              paths += uris.get(i).toString();
            else
              paths += "," + uris.get(i).toString();
          }
          GetMultipleContentsObserver.update(paths);
        }
      });
    // Open document tree
    openDocumentTreeActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.OpenDocumentTree(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
          OpenDocumentTreeObserver.update(uri.toString());
        }
      });
    // Create document
    createDocumentActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.CreateDocument(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
          OpenDocumentObserver.update(uri.toString());
        }
      });
    // Open document
    openDocumentActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.OpenDocument(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
          CreateDocumentObserver.update(uri.toString());
        }
      });
  }

  public void getConent(String mimeType) {
    getContentActivityLauncher.launch(mimeType);
  }

  public void getMultipleContents(String mimeType) {
    getMultipleContentsActivityLauncher.launch(mimeType);
  }

  public void openDocumentTree() {
    openDocumentTreeActivityLauncher.launch(Uri.EMPTY);
  }

  public void openDocument(String[] mimeTypes) {
    openDocumentActivityLauncher.launch(mimeTypes);
  }

  public void createDocument(String mimeType) {
    createDocumentActivityLauncher.launch(mimeType);
  }

  public void createFile(String path, String fileName, String mimeType, String data) {
    Uri uri = Uri.parse(path);
    DocumentFile folder = DocumentFile.fromTreeUri(app, uri);
    DocumentFile file = folder.createFile(mimeType, fileName);
    try {
      OutputStream outputStream = app.getContentResolver().openOutputStream(file.getUri());
      outputStream.write(data.getBytes(StandardCharsets.UTF_8));
      outputStream.close();
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
