import React from "react";
import Button from "./Button";
import { IoCloudDownload, IoTrashBin } from "react-icons/io5";

interface Props {
    files: {
      id: string;
      name: string;
    }[];
    onDelete?: (file: any) => void;
    onDownload?: (file: any) => void;
}

const FileList = ({ files, onDelete, onDownload }: Props) => {
  const listedFiles = files.map(file => (
    <li className="flex items-center justify-between" key={file.id}>
      {file.name} 
      <div>
        {onDownload && <Button type="button" variant="transparent" size="sm" onClick={() => onDownload(file)} rounded><IoCloudDownload className="w-8" /></Button> }
        {onDelete && <Button type="button" variant="transparent" size="sm" onClick={() => onDelete(file)} rounded><IoTrashBin className="w-8" /></Button> }
      </div>
    </li>
  ));

  return (
    <ul className="text-left w-full">
      {listedFiles}
    </ul>
  )
};

export default FileList;