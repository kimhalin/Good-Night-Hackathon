import {IsString} from "class-validator";
import {Exclude, Expose, Type} from "class-transformer";
import {string} from "joi";
import {OmitType} from "@nestjs/swagger";
import {RestaurantDto} from "../../restaurant/dto/restaurant.dto";

@Exclude()
export class UserRestaurantBookmarkDto extends OmitType(RestaurantDto,['createdAt']){
    @Expose()
    createdAt: Date;
}