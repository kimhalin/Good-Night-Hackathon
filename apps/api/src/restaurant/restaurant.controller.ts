import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {RestaurantService} from "../../../domain/restaurant/restaurant.service";
import {RestaurantDto} from "../../../domain/restaurant/dto/restaurant.dto";
import {CreateRestaurantDto} from "../../../domain/restaurant/dto/create-restaurant.dto";
import {UpdateRestaurantDto} from "../../../domain/restaurant/dto/update-restaurant.dto";

@Controller()
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {}

    // 전체 목록 조회
    @Get('restaurants')
    async findAll(): Promise<RestaurantDto[]> {
        return this.restaurantService.findAll();
    }

    // 전체 목록 조회 - 카테고리별
    @Get('restaurants/search')
    async findByRestaurantsCategory(@Query('category') category: string): Promise<RestaurantDto[]> {
        return this.restaurantService.findRestaurantsByCategory(category);
    }

    // 단일 조회
    @Get('restaurants/:id')
    async findRestaurantById(@Param('id') restaurantId: number): Promise<RestaurantDto> {
        return this.restaurantService.findRestaurantById(restaurantId);
    }

    // 레스토랑 등록
    @Post('restaurants')
    async createRestaurant(@Body() dto: CreateRestaurantDto): Promise<RestaurantDto> {
        const restaurant = await this.restaurantService.createRestaurant(dto);
        return this.restaurantService.findRestaurantById(restaurant.id);
    }

    // 레스토랑 수정
    @Patch('restaurants/:id')
    async updateRestaurant(
        @Body() dto: UpdateRestaurantDto,
        @Param('id') restaurantId: number
    ) : Promise<RestaurantDto> {
        const restaurant = await this.restaurantService.updateRestaurant(restaurantId, dto);
        return this.restaurantService.findRestaurantById(restaurant.id);
    }

    // 레스토랑 삭제
    @Delete('restaurants/:id')
    async deleteRestaurant(@Param('id') restaurantId: number): Promise<void> {
        await this.restaurantService.removeRestaurant(restaurantId);
    }
}