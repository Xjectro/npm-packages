"use client";

import { cn } from "../lib/utils";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Trash, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Spinner } from "./loaders";
import { Button } from "./button";

export const FileUpload = ({
  onChange = (files: File[]) => {
    console.log(files);
  },
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange([...files, ...newFiles]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    onChange(files.filter((file) => file !== fileToRemove));
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        whileHover="animate"
        className="group/file relative w-full rounded-lg"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="relative flex w-full flex-col items-start gap-5">
          {files.length > 0 &&
            files.map((file, idx) => (
              <motion.div
                key={"file" + idx}
                layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                className={cn(
                  "!border-surface-300 bg-surface-200 relative z-40 m-auto flex h-32 w-full flex-col items-center justify-center rounded-lg border px-6",
                  "shadow-sm",
                )}
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-typography-50 max-w-xs truncate text-start text-base"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="shadow-input text-typography-50 w-fit shrink-0 rounded-lg py-1 text-end text-sm"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className="text-typography-50 mt-2 flex w-full flex-col items-start justify-between text-sm md:flex-row md:items-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="bg-primary-500/10 text-primary-500 rounded-md px-1 py-0.5"
                  >
                    {file.type}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-primary-500 bg-primary-500/10 rounded-md px-1 py-0.5"
                  >
                    {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
                <div className="absolute -right-3 -top-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <Trash />
                  </Button>
                </div>
              </motion.div>
            ))}
          <button
            type="button"
            onClick={handleClick}
            className={
              "bg-surface-200 hover:bg-surface-300 !border-surface-300 cursor-pointer relative z-40 mx-auto flex h-32 w-full items-center justify-center rounded-lg border transition-colors"
            }
          >
            {isDragActive ? (
              <Spinner size="sm" />
            ) : (
              <Upload className="text-typography-50 size-6" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
