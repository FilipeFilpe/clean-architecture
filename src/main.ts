import { ApiExpress } from "./infra/api/express/api.express";
import { CreateBrandRoute } from "./infra/api/express/routes/brand/create-brand.express.route";
import { ListBrandRoute } from "./infra/api/express/routes/brand/list-brand.express.route";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.route";
import { DeleteProductRoute } from "./infra/api/express/routes/product/delete-product.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.route";
import { UpdateProductRoute } from "./infra/api/express/routes/product/update-product.express.route";
import { BrandRepositoryPrisma } from "./infra/repositories/brand/brand.repository.prisma";
import { NotificationRepositoryMailtrap } from "./infra/repositories/notification/notification.repository.mailtrap";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { mailtTrap } from "./package/mailtrap/mailtrap";
import { CreateBrandUsecase } from "./usecases/create-brand/create-brand.usecase";
import { CreateProductUsecase } from "./usecases/create-product/create-product.usecase";
import { DeleteProductUsecase } from "./usecases/delete-product/delete-product.usecase";
import { FindBrandUsecase } from "./usecases/find-brand/find-brand.usecase";
import { ListBrandUsecase } from "./usecases/list-brand/list-brand.usecase";
import { ListProductUsecase } from "./usecases/list-product/list-product.usecase";
import { UpdateProductUsecase } from "./usecases/update-product/update-product.usecase";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { CreateUserUsecase } from "./usecases/create-user/create-user.usecase";
import { ListUserUsecase } from "./usecases/list-user/list-user.usecase";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { ListUserRoute } from "./infra/api/express/routes/user/list-user.express.route";
import { SignInUsecase } from "./usecases/sign-in/sign-in.usecase";
import { SignInRoute } from "./infra/api/express/routes/auth/sign-in.express.route";
import { CreateTokenUsecase } from "./usecases/create-token/create-token.usecase";
import { VerifyTokenUsecase } from "./usecases/verify-token/verify-token.usecase";
import { SignOutUsecase } from "./usecases/sign-out/sign-out.usecase";
import { SignOutRoute } from "./infra/api/express/routes/auth/sign-out.express.route";

function main() {
  // repositories //
  const aNotificationRepository =
    NotificationRepositoryMailtrap.create(mailtTrap);
  const aProductRepository = ProductRepositoryPrisma.create(prisma);
  const aBrandRepository = BrandRepositoryPrisma.create(prisma);
  const aUserRepository = UserRepositoryPrisma.create(prisma);

  // usecases //
  const createProductUsecase = CreateProductUsecase.create(
    aProductRepository,
    aNotificationRepository
  );
  const updateProductUsecase = UpdateProductUsecase.create(aProductRepository);
  const listProductUsecase = ListProductUsecase.create(aProductRepository);
  const deleteProductUsecase = DeleteProductUsecase.create(aProductRepository);

  const createBrandUsecase = CreateBrandUsecase.create(aBrandRepository);
  const listBrandUsecase = ListBrandUsecase.create(aBrandRepository);
  const findBrandUsecase = FindBrandUsecase.create(aBrandRepository);

  const createUserUsecase = CreateUserUsecase.create(
    aUserRepository,
    aNotificationRepository
  );
  const listUserUsecase = ListUserUsecase.create(aUserRepository);

  const signInUsecase = SignInUsecase.create(aUserRepository);
  const signOutUsecase = SignOutUsecase.create(aUserRepository);

  const createTokenUsecase = CreateTokenUsecase.create(aUserRepository);
  const verifyTokenUsecase = VerifyTokenUsecase.create(aUserRepository);

  // routes //
  const createBrandRoute = CreateBrandRoute.create(createBrandUsecase);
  const listBrandRoute = ListBrandRoute.create(listBrandUsecase);

  const createRoute = CreateProductRoute.create(
    createProductUsecase,
    findBrandUsecase
  );
  const updateRoute = UpdateProductRoute.create(
    updateProductUsecase,
    findBrandUsecase
  );
  const listProductRoute = ListProductRoute.create(listProductUsecase);
  const deleteProductRoute = DeleteProductRoute.create(deleteProductUsecase);

  const createUserRoute = CreateUserRoute.create(createUserUsecase);
  const listUserRoute = ListUserRoute.create(listUserUsecase);

  const signInRoute = SignInRoute.create(signInUsecase, createTokenUsecase);
  const signOutRoute = SignOutRoute.create(signOutUsecase);

  const api = ApiExpress.create(
    [signInRoute],
    [
      createRoute,
      updateRoute,
      listProductRoute,
      deleteProductRoute,
      createBrandRoute,
      listBrandRoute,
      createUserRoute,
      listUserRoute,
      signOutRoute,
    ],
    verifyTokenUsecase
  );
  const port = Number(process.env?.PORT) || 8000;
  api.start(port);
}

main();
