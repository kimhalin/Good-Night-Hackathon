import {Exclude, Expose, Type} from "class-transformer";
import {RestaurantDto} from "../../restaurant/dto/restaurant.dto";

@Exclude()
export class ReviewDto {

    @Expose()
    @Type(()=> RestaurantDto)
    restaurant: RestaurantDto;

    @Expose()
    title: string;

    @Expose()
    content: string;
}