import { Notification } from "../entity/notification";

export interface NotificationGateway {
  send(notification: Notification): void;
}
