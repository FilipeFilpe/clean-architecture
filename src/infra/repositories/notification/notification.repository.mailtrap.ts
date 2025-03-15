import { MailtrapClient } from "mailtrap";
import { Notification } from "../../../domain/notification/entity/notification";
import { NotificationGateway } from "../../../domain/notification/gateway/notification.gateway";

export class NotificationRepositoryMailtrap implements NotificationGateway {
  private constructor(private readonly mailTrapClient: MailtrapClient) {}

  public static create(mailtrap: MailtrapClient) {
    return new NotificationRepositoryMailtrap(mailtrap);
  }

  send(notification: Notification): void {
    const senderEmail = process.env.MAILTRAP_SENDER_EMAIL || "";
    const senderName = process.env.MAILTRAP_SENDER_NAME || "";

    this.mailTrapClient.testing
      .send({
        from: {
          name: senderName,
          email: senderEmail,
        },
        to: [{ email: notification.to }],
        subject: notification.subject,
        text: notification.message,
      })
      .then(console.log)
      .catch(console.error);
  }
}
