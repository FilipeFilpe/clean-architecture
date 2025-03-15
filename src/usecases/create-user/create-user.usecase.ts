import { Notification } from "../../domain/notification/entity/notification";
import { NotificationGateway } from "../../domain/notification/gateway/notification.gateway";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
  name: string;
  email: string;
  password: string;
};
export type CreateUserOutputDto = {
  id: string;
};

export class CreateUserUsecase
  implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly notificationGateway: NotificationGateway
  ) {}

  public static create(
    userGateway: UserGateway,
    notificationGateway: NotificationGateway
  ) {
    return new CreateUserUsecase(userGateway, notificationGateway);
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const user = await User.create(name, email, password);
    await this.userGateway.save(user);

    const notification: Notification = Notification.create({
      from: "noreply@filipesousa.dev",
      to: user.email,
      message: `User ${user.name}, created with success!`,
      subject: "Welcome to our app",
    });
    this.notificationGateway.send(notification);

    const output: CreateUserOutputDto = this.presentOutput(user);
    return output;
  }

  private presentOutput(user: User): CreateUserOutputDto {
    return {
      id: user.id,
    };
  }
}
