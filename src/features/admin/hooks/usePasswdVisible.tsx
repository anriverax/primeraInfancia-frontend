import { Eye, EyeOff } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type Visibility = [boolean, { endContent: React.JSX.Element }];

const usePasswdVisible = (): Visibility => {
  const [isPasswordVisible, setPasswordVisible1] = useState<boolean>(false);

  const toggleVisibilityPsswd = useCallback(() => {
    setPasswordVisible1((prev) => !prev);
  }, []);

  const handlePasswordVisible = useMemo(
    () => ({
      endContent: (
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibilityPsswd}
        >
          {isPasswordVisible ? (
            <EyeOff size={18} className="text-gray-400" />
          ) : (
            <Eye size={18} className="text-gray-400" />
          )}
        </button>
      )
    }),
    [isPasswordVisible, toggleVisibilityPsswd]
  );

  return [isPasswordVisible, handlePasswordVisible];
};

export { usePasswdVisible };
