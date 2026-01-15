import { AxiosMessage } from "@/shared/types/globals";
import { Alert } from "@heroui/react";
import { memo, useCallback } from "react";

/**
 * Interface for the props expected by the withConditionalAlert HOC.
 */
type ConditionalAlertProps = {
  status: number | undefined;
  errors: AxiosMessage;
  /**
   * Callback function to close the alert.
   */
  setStatus: (_status: undefined) => void;
};

const normalizeMessage = (msg: unknown): string => {
  if (typeof msg !== "string") return "";
  return msg.replace(/[<>]/g, "");
};

/**
 * Functional component for a conditional alert.
 * @param {WithConditionalAlertProps} props - Props for the ConditionalAlert component.
 * @returns {React.JSX.Element} - React JSX element representing the conditional alert.
 */
const ConditionalAlert = memo(
  ({ status, errors, setStatus }: ConditionalAlertProps): React.JSX.Element => {
    const isVisible = Boolean(status && status >= 400);
    /* eslint-disable react-hooks/exhaustive-deps */
    const handleClose = useCallback(() => setStatus(undefined), []);
    /* eslint-enable react-hooks/exhaustive-deps */
    // Extracting axiosMessage from errors object
    const axiosError: string | string[] | undefined = errors ? errors.axiosMessage : undefined;

    return (
      <div className="flex flex-col justify-center items-center gap-4 mb-3">
        <Alert color="danger" isVisible={isVisible} variant="flat" onClose={handleClose}>
          {typeof axiosError !== "string" && axiosError !== undefined ? (
            <ul className="list-disc ml-3">
              {axiosError.map((message: string, index: number) => (
                <li key={index}>{normalizeMessage(message)}</li>
              ))}
            </ul>
          ) : (
            <span className="mb-0">{normalizeMessage(axiosError)}</span>
          )}
        </Alert>
      </div>
    );
  }
);

ConditionalAlert.displayName = "MemorizedConditionalAlert";

export default ConditionalAlert;
