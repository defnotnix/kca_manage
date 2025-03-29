export type propTriggerNotification = {
  title?: string;
  message?: string;
  autoClose?: number | false;
  onClose?: () => void;
  newMessage?: boolean;
};
