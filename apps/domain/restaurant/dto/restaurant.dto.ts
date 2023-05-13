import {Exclude, Expose} from "class-transformer";

@Exclude()
export class RestaurantDto {
    @Expose()
    name: string;

    @Expose()
    category: string;

    @Expose()
    createdAt: Date;
}
