import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  getusertext(): string {
    return "usertext!";
  }
}
