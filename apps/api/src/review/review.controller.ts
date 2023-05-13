import {Controller, Get, Query} from "@nestjs/common";
import {RestaurantDto} from "../../../domain/restaurant/dto/restaurant.dto";

@Controller()
export class ReviewController {

    @Get('reviews')
    async findByRestaurantsCategory(@Query() category: string): Promise<RestaurantDto[]> {
        // Todo
        return null;
    }
}