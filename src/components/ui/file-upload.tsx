
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  value?: string;
  onChange: (value: string) => void;
  accept?: string;
  placeholder?: string;
  className?: string;
}

export const FileUpload = ({ value, onChange, accept, placeholder, className }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // In a real application, you would upload the file to a server
    // and get back a URL or file ID. For now, we'll just use the file name
    onChange(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {value ? (
        <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
          <File className="h-4 w-4 text-gray-500" />
          <span className="flex-1 text-sm text-gray-700 truncate">{value}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition-colors",
            "hover:border-gray-400 hover:bg-gray-50",
            isDragOver && "border-blue-400 bg-blue-50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            {placeholder || "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500">
            {accept ? `Supported formats: ${accept}` : "All file types supported"}
          </p>
        </div>
      )}
    </div>
  );
};
