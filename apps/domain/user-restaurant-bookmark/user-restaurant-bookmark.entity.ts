import {TypeOrmEntity} from "../common/typeorm.entity";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {User} from "../user/user.entity";
import Joi from "joi";
import {Restaurant} from "../restaurant/restaurant.entity";

@Entity()
export class UserRestaurantBookmark extends TypeOrmEntity {

    @Column()
    userId: number;

    @Column()
    restaurantId: number;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Restaurant, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'restaurantId', referencedColumnName: 'id'})
    restaurant: Restaurant;

}