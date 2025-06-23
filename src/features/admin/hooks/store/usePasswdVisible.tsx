import { Eye, EyeOff } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type Visibility = [boolean, { endContent: React.JSX.Element }];

const usePasswdVisible = (): Visibility => {
  const [isVisiblePsswd, setIsVisiblePsswd] = useState<boolean>(false);

  const toggleVisibilityPsswd = useCallback(() => {
    setIsVisiblePsswd((prev) => !prev);
  }, []);

  const visiblePsswd = useMemo(
    () => ({
      endContent: (
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibilityPsswd}
        >
          {isVisiblePsswd ? (
            <EyeOff size={18} className="text-gray-400" />
          ) : (
            <Eye size={18} className="text-gray-400" />
          )}
        </button>
      )
    }),
    [isVisiblePsswd, toggleVisibilityPsswd]
  );

  return [isVisiblePsswd, visiblePsswd];
};

export { usePasswdVisible };
