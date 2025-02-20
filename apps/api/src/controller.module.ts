import {Module} from "@nestjs/common";
import {ReviewController} from "./review/review.controller";
import {RestaurantController} from "./restaurant/restaurant.controller";
import {DomainModule} from "../../domain/domain.module";
import {UserController} from "./user/user.controller";

@Module({
    imports: [DomainModule],
    controllers: [
        RestaurantController,
        ReviewController,
        UserController,
    ],
})
export class ControllerModule {}