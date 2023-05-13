import {Module} from "@nestjs/common";
import {RestaurantService} from "./restaurant/restaurant.service";
import {ReviewService} from "./review/review.service";

const services = [
    RestaurantService,
    ReviewService,
];

@Module({
    imports: [

    ],
    // ...: 전개연산자 -> 배열에 배열을 넣기 위함
    providers: [...services],
    exports: [...services],
})
export class DomainModule {}