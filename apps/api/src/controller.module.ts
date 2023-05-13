import {Module} from "@nestjs/common";
import {ReviewController} from "./review/review.controller";
import {RestaurantController} from "./restaurant/restaurant.controller";
import {DomainModule} from "../../domain/domain.module";

@Module({
    imports: [DomainModule],
    controllers: [
        RestaurantController,
        ReviewController
    ],
})
export class ControllerModule {}