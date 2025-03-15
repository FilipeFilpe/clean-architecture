export type NotificationProps = {
  from: string;
  to: string;
  subject: string;
  message: string;
};

export class Notification {
  constructor(private readonly props: NotificationProps) {}

  public static create(props: NotificationProps) {
    return new Notification(props);
  }

  public static with(props: NotificationProps) {
    return new Notification(props);
  }

  public get from() {
    return this.props.from;
  }
  public get to() {
    return this.props.to;
  }
  public get subject() {
    return this.props.subject;
  }
  public get message() {
    return this.props.message;
  }
}
