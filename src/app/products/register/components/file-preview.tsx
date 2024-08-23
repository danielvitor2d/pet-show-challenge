import React from 'react';

interface FilePreviewProps {
  files: FileList | File[] | File | null;
  onRemove: (index: number) => void;
}

interface FileItemProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, index, onRemove }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(null);

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    return () => {
      setPreview(null);
    };
  }, [file]);

  return (
    <div key={index} className="relative w-32 h-32">
      {preview ? (
        <img
          src={preview as string}
          alt={`Preview ${index}`}
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
  const fileArray = React.useMemo(() => {
    if (files instanceof FileList) {
      return Array.from(files);
    }
    if (Array.isArray(files)) {
      return files;
    }
    if (files) {
      return [files];
    }
    return [];
  }, [files]);

  if (fileArray.length === 0) {
    return <p>{"No image selected"}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {fileArray.map((file, index) => (
        <FileItem
          key={index}
          file={file}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default FilePreview;
