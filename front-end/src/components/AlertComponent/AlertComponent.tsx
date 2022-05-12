import { Alert } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { IUserInfoContext } from "../../Model/models";

interface IProps {
  className: string | undefined;
  message: string | null | undefined;
}

export const AlertComponent: React.FC<IProps> = ({ className, message }) => {
  return (
    <Alert
      icon={<AlertCircle size={16} />}
      title="Error!"
      color="red"
      radius="xs"
      className={className}
    >
      {message}
    </Alert>
  );
};
