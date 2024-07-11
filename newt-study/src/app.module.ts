import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CatsController } from "./cats/cats.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, OrderModule],
  controllers: [AppController, CatsController],
  providers: [AppService]
})
export class AppModule {
}
