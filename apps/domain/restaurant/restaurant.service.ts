import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Restaurant} from "./restaurant.entity";
import {Repository} from "typeorm";
import {CreateRestaurantDto} from "./dto/create-restaurant.dto";
import {UpdateRestaurantDto} from "./dto/update-restaurant.dto";
import {RestaurantDto} from "./dto/restaurant.dto";
import {Transactional} from "typeorm-transactional-cls-hooked";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
    ) {}

    // 레스토랑 등록
    async createRestaurant(dto: CreateRestaurantDto): Promise<Restaurant> {
        const restaurant = new Restaurant();
        restaurant.name = dto.name;
        restaurant.category = dto.category;
        await this.restaurantRepository.save(restaurant);

        return restaurant;
    }

    // 레스토랑 수정
    async updateRestaurant(restaurantId: number, dto: UpdateRestaurantDto): Promise<RestaurantDto> {
        const restaurant = await this.getOneById(restaurantId);
        restaurant.category = dto.category;

        return this.restaurantRepository.save(restaurant);
    }

    // 레스토랑 조회
    async findRestaurantById(restaurantId: number): Promise<RestaurantDto> {
        return this.getOneById(restaurantId);
    }

    // 레스토랑 목록 조회
    async findAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find();
    }

    // 레스토랑 목록 조회 - 카테고리 필터링
    async findRestaurantsByCategory(category: string): Promise<RestaurantDto[]> {
        return this.restaurantRepository.find({
            where: {
                category: category
            },
        })
    }

    //레스토랑 삭제 (Soft Delete)
    async removeRestaurant(id: number): Promise<void> {
        const restaurant = await this.getOneById(id);
        await this.restaurantRepository.softRemove(restaurant);
    }


    async getOneById(id: number): Promise<Restaurant> {
        return await this.restaurantRepository.findOne({
            where: {
                id,
            }
        })
    }
}