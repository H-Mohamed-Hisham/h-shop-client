import { Alert } from "react-bootstrap";

type props = {
  variant?: string;
  message: any;
  className?: string;
};

const Message: React.FC<props> = ({ variant, message, className }) => {
  return (
    <Alert variant={(variant = "danger")} className={className}>
      {message}
    </Alert>
  );
};

export default Message;
