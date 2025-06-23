import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UploadLayout from "./layout/uploadLayout";

type DuiUploadProps = {
  images: File[];

  setImages: (_file: File[]) => void;
};

const DuiUpload = ({ images, setImages }: DuiUploadProps): React.JSX.Element => {
  const [imagesUploadError, setImagesUploadError] = useState<string | null>(null);

  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // Valida tipo de archivos
      const invalidFiles = selectedFiles.filter((file) => !file.type.startsWith("image/"));

      if (invalidFiles.length > 0) {
        setImagesUploadError("Debes subir solo imágenes con formato JPG o PNG");
        return;
      }

      if (images.length === 0) {
        if (selectedFiles.length !== 2) {
          setImagesUploadError("Por favor, selecciona exactamente 2 imágenes.");
          return;
        } else setImages(selectedFiles);
      } else setImages(selectedFiles.slice(0, 2));
    }
  };

  const resetImages = (): void => {
    setImages([]);

    setImagesUploadError("Por favor, selecciona exactamente 2 imágenes.");
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };

  useEffect(() => {
    if (images.length < 2) setImagesUploadError("Debes subir exactamente 2 imágenes");
    else setImagesUploadError(null);
  }, [images]);

  return (
    <UploadLayout
      title="Subir DUI"
      errors={imagesUploadError}
      fileInput={images.length === 2}
      removeFile={resetImages}
    >
      <>
        {images.length ? (
          <div className="flex items-center gap-3">
            {images.map((img, index) => (
              <div key={index}>
                <div className="w-19 h-19 rounded-md overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      fill
                      src={URL.createObjectURL(img) || "/placeholder.svg"}
                      alt={`Image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <label className="flex items-center justify-center w-full h-20 rounded-md cursor-pointer">
            <div className="flex flex-col items-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
              <span className="mt-1 text-sm text-gray-500">Selecciona exactamente 2 imágenes</span>
            </div>
            <input
              multiple
              type="file"
              accept="image/*"
              className="hidden"
              ref={imagesInputRef}
              onChange={handleImagesChange}
            />
          </label>
        )}
      </>
    </UploadLayout>
  );
};

export default DuiUpload;
