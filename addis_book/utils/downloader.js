import * as FileSystem from "expo-file-system";

const DOWNLOAD_DIR = FileSystem.documentDirectory + "downloads/";
const IMAGE_DIR = FileSystem.documentDirectory + "downloads/images/";

const ensureDownloadDirsExist = async () => {
  const downloadDirInfo = await FileSystem.getInfoAsync(DOWNLOAD_DIR);
  const imageDirInfo = await FileSystem.getInfoAsync(IMAGE_DIR);
  if (!downloadDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(DOWNLOAD_DIR, { intermediates: true });
  }
  if (!imageDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
};

// Save metadata to a file
const saveMetadata = async (metadata) => {
  try {
    const metadataFilePath = DOWNLOAD_DIR + "metadata.json";
    let metadataList = [];
    const fileInfo = await FileSystem.getInfoAsync(metadataFilePath);
    if (fileInfo.exists) {
      const metadataString = await FileSystem.readAsStringAsync(metadataFilePath);
      metadataList = JSON.parse(metadataString);
    }
    const existingEntry = metadataList.find((item) => item.id === metadata.id);
    if (existingEntry) {
      return;
    }
    metadataList.push(metadata);
    await FileSystem.writeAsStringAsync(metadataFilePath, JSON.stringify(metadataList));
  } catch (error) {
    console.error("Error saving metadata:", error);
  }
};

// Download file and cover, and save metadata with progress tracking
export const downloadFile = async (id, fileUrl, coverUrl, title, author, progressCallback) => {
  try {
    await ensureDownloadDirsExist();

    const fileName = fileUrl.split("/").pop();
    const fileLocalUri = DOWNLOAD_DIR + fileName;

    // If the file does not exist, start downloading
    const fileInfo = await FileSystem.getInfoAsync(fileLocalUri);
    if (!fileInfo.exists) {
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        fileLocalUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          progressCallback(progress);
        }
      );

      const { uri: fileUri } = await downloadResumable.downloadAsync();
    }

    // Download cover image
    const coverName = coverUrl.split("/").pop();
    const coverLocalUri = IMAGE_DIR + coverName;
    const coverInfo = await FileSystem.getInfoAsync(coverLocalUri);
    if (!coverInfo.exists) {
      const { uri: coverUri } = await FileSystem.downloadAsync(coverUrl, coverLocalUri);
    }

    // Save metadata
    const metadata = {
      id,
      title,
      cover: coverLocalUri,
      author,
      fileUri: fileLocalUri,
    };
    await saveMetadata(metadata);
    return metadata;

  } catch (error) {
    console.error("Error downloading file and saving metadata:", error);
  }
};
