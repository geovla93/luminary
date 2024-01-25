import {useState, useEffect} from 'react';
import {
  CloudStorage,
  CloudStorageError,
  CloudStorageErrorCode,
  CloudStorageScope,
  useIsCloudAvailable,
} from 'react-native-cloud-storage';
import {Alert} from 'react-native';

const useCloudBackup = (filename: string) => {
  const isIcloudAvailable = useIsCloudAvailable();
  const [loading, setLoading] = useState(false);
  const [fileContents, setFileContents] = useState<any>();
  const [stats, setStats] = useState<any>();

  const parentDirectory = '/';
  CloudStorage.setDefaultScope(CloudStorageScope.Documents);

  const writeFileToCloud = async (fileContent: string) => {
    setLoading(true);
    console.log(fileContent);
    try {
      console.log('write file to cloud');
      await CloudStorage.writeFile(
        parentDirectory + '/' + filename,
        fileContent,
      );
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  };

  const handleListContents = async () => {
    setLoading(true);
    try {
      const contents = await CloudStorage.readdir(parentDirectory);
      Alert.alert('Directory contents', contents.map(c => `• ${c}`).join('\n'));
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const readFile = async () => {
    setLoading(true);
    try {
      const newStats = await CloudStorage.stat(
        parentDirectory + '/' + filename,
      );
      setStats(newStats);
      if (!newStats.isDirectory()) {
        setFileContents(
          await CloudStorage.readFile(parentDirectory + '/' + filename),
        );
      }
    } catch (e) {
      if (e instanceof CloudStorageError) {
        if (e.code === CloudStorageErrorCode.FILE_NOT_FOUND) {
          setStats(null);
          setFileContents('');
        } else {
          console.warn('Native storage error', e.code, e.message);
        }
      } else {
        console.warn('Unknown error', e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Call readFile when filename is changed.
    readFile();
  }, [filename]);

  return {
    isIcloudAvailable,
    writeFileToCloud,
    loading,
    readFile,
    stats,
    handleListContents,
    fileContents,
  };
};

export default useCloudBackup;
