import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  NestFactory.create(AppModule).then(app => {
    app.listen(3000);
  });
}

bootstrap();
// .then((res) => {
//   console.log(res, "res");
// })
// .catch((err) => {
//   console.log(err, "err");
// });
