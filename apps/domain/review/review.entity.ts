import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {TypeOrmEntity} from "../common/typeorm.entity";
import {Restaurant} from "../restaurant/restaurant.entity";

@Entity()
export class Review extends TypeOrmEntity {
    @Column({comment: '제목'})
    title: string;

    @Column({comment: '내용'})
    content: string;

    @ManyToOne(() => Restaurant, {})
    @JoinColumn({referencedColumnName: 'id', name:'restaurantId'})
    restaurant: Restaurant;
}