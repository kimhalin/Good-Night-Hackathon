import {Column, Entity} from "typeorm";
import {TypeOrmEntity} from "../common/typeorm.entity";


@Entity()
export class Restaurant extends TypeOrmEntity {
    @Column({comment: '이름'})
    name: string;

    @Column({comment: '카테고리'})
    category: string;
}