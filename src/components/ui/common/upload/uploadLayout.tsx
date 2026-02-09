import { AlertCircle, X } from "lucide-react";
import { PropsWithChildren } from "react";

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
}: PropsWithChildren<UploadLayoutProps>): React.JSX.Element => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-medium text-neutral-600">{title}</h2>
    </div>

    <div className="space-y-3">
      <div className="flex items-center justify-center space-x-3">
        <div className="flex flex-col items-center justify-center w-full h-20 px-4 transition border border-dashed rounded-lg appearance-none cursor-pointer hover:border-neutral-400 focus:outline-none border-neutral-200">
          {fileInput && (
            <button
              type="button"
              className="cursor-pointer mb-1 p-1.5 rounded-full text-neutral-500 bg-neutral-500/10 hover:bg-neutral-500/20"
              onClick={onRemoveFile}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {children}
        </div>
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
