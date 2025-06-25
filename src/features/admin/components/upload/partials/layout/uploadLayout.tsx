import { AlertCircle, X } from "lucide-react";
import { JSX, PropsWithChildren } from "react";

type UploadLayoutProps = {
  title: string;
  errors: string | null;
  fileInput: File | null | boolean;
  onRemoveFile: () => void;
};

const UploadLayout = ({
  title,
  errors,
  onRemoveFile,
  fileInput,
  children
}: PropsWithChildren<UploadLayoutProps>): JSX.Element => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-medium text-gray-700">{title}</h2>
    </div>

    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div
          className={`flex items-center justify-center w-full h-20 px-4 transition border border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${fileInput ? "border-gray-300 bg-gray-50" : "border-gray-200"}`}
        >
          {children}
        </div>

        {fileInput && (
          <button
            type="button"
            className="cursor-pointer p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
            onClick={onRemoveFile}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {errors && (
        <div className="flex items-center text-sm text-red-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors}
        </div>
      )}
    </div>
  </div>
);

export default UploadLayout;
