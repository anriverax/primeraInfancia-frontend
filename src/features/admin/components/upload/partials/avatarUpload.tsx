import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import UploadLayout from "./layout/uploadLayout";

type AvatarUploadProps = {
  avatar: File | null;
  onAvatarChange: (_file: File | null) => void;
};

const AvatarUpload = ({ avatar, onAvatarChange }: AvatarUploadProps): React.JSX.Element => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Remove avatar
  const handleRemoveFile = (): void => {
    onAvatarChange(null);
    setAvatarPreview(null);
    setAvatarUploadError(null);
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  // Handle avatar upload - exactly 1 image
  const handleAvatarInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Valida el tipo de archivo - solo images
      if (!selectedFile.type.startsWith("image/")) {
        setAvatarUploadError("Debes subir una imagen en formato JPG o PNG");
        if (avatarInputRef.current) avatarInputRef.current.value = "";
        return;
      }

      onAvatarChange(selectedFile);
      setAvatarUploadError(null);

      // Crea un preview de la imagen
      const reader = new FileReader();
      reader.onload = (): void => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <UploadLayout
      title="Subir Avatar"
      errors={avatarUploadError}
      fileInput={avatar}
      onRemoveFile={handleRemoveFile}
    >
      <>
        {avatarPreview && avatar ? (
          <div className="relative">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                fill
                src={avatarPreview || "/placeholder.svg"}
                alt="Avatar preview"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <label className="w-full">
            <div className="flex items-center justify-center h-16 px-4 transition rounded-md appearance-none cursor-pointer focus:outline-none">
              <div className="flex flex-col rounded-full items-center space-y-1">
                <UserCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Selecione una imagen para avatar</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={avatarInputRef}
                onChange={handleAvatarInputChange}
              />
            </div>
          </label>
        )}
      </>
    </UploadLayout>
  );
};

export default AvatarUpload;
