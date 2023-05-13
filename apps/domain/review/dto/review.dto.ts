import {Exclude, Expose} from "class-transformer";

@Exclude()
export class ReviewDto {

    @Expose()
    restaurantName: string;

    @Expose()
    title: string;

    @Expose()
    content: string;
}