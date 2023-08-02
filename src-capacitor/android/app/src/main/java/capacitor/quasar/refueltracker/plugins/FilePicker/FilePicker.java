package capacitor.quasar.refueltracker.plugins.FilePicker;

import android.net.Uri;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import java.util.List;

public class FilePicker {
  public IFilePathObserver FilePathResultObserver;
  public IFilePathObserver FilePathResultsObserver;
  public IFilePathObserver DirPathResultObserver;

  private final ActivityResultLauncher<String> filePathActivityLauncher;
  private final ActivityResultLauncher<String> filePathsActivityLauncher;
  private final ActivityResultLauncher<Uri> dirPathActivityLauncher;

  public FilePicker(AppCompatActivity activity) {
    // File
    filePathActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.GetContent(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
          FilePathResultObserver.update(uri.toString());
        }
      });
    // Files
    filePathsActivityLauncher = activity.registerForActivityResult(
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
          FilePathResultsObserver.update(paths);
        }
      });
    // Directory
    dirPathActivityLauncher = activity.registerForActivityResult(
      new ActivityResultContracts.OpenDocumentTree(),
      new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
//          try {
//            InputStream inputStream = activity.getContentResolver().openInputStream(uri);
//            DirPathResultObserver.update(inputStream.toString());
//          } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//          }

          DirPathResultObserver.update(uri.toString());
        }
      });
  }

  public void pickFile(String mimeType) {
    filePathActivityLauncher.launch(mimeType);
  }

  public void pickFiles(String mimeType) {
    filePathsActivityLauncher.launch(mimeType);
  }

  public void pickDir() {
    dirPathActivityLauncher.launch(Uri.EMPTY);
  }
}
