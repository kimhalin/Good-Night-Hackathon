import {Column, Entity, OneToMany} from "typeorm";
import {TypeOrmEntity} from "../common/typeorm.entity";
import {Role} from "../common/enum";
import {UserRestaurantBookmark} from "../user-restaurant-bookmark/user-restaurant-bookmark.entity";

@Entity()
export class User extends TypeOrmEntity {

    @Column({comment: '유저이름'})
    name: string;

    @Column({comment: '이메일', unique: true})
    email: string;

    @Column({comment: '비밀번호'})
    password: string;

    @Column({type: 'enum', enum: Role})
    role: Role;

    @OneToMany(
        () => UserRestaurantBookmark,
        (userRestaurantBookmark) => userRestaurantBookmark.user,
        )
    userRestaurantBookmarks: UserRestaurantBookmark[];

}