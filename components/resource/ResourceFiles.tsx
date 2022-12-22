import FileAPI from "../../lib/api/files";
import FileList from "../common/FileList";
import Heading from "../common/Heading";
import fileDownload from 'js-file-download';

interface Props {
  files: any[];
}

const ResourceFiles = ({ files }: Props) => {
  
  const handleDownload = async (file: any) => {
    try {
      const response = await FileAPI.download(file.id);

      fileDownload(response.data, file.name)
    } catch(e: any) {
      console.error(e);
    }
  }

  return (
    <div className="bg-slate-700 mt-4 p-4 rounded">
        <Heading as="h2">Files</Heading>
        <FileList files={files} onDownload={handleDownload} />
    </div>
  )
}

export default ResourceFiles;