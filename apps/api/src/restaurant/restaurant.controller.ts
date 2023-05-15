import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {RestaurantService} from "../../../domain/restaurant/restaurant.service";
import {RestaurantDto} from "../../../domain/restaurant/dto/restaurant.dto";
import {CreateRestaurantDto} from "../../../domain/restaurant/dto/create-restaurant.dto";
import {UpdateRestaurantDto} from "../../../domain/restaurant/dto/update-restaurant.dto";
import {CustomApiOperation} from "../../../infrastructure/swagger/decorators";

@Controller()
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {}

    @CustomApiOperation({
        summary: '전체 식당 조회',
        tags: ['restaurants'],
    })
    @Get('restaurants')
    async findAll(): Promise<RestaurantDto[]> {
        return this.restaurantService.findAll();
    }

    @CustomApiOperation({
        summary: '카테고리별 식당 조회',
        tags: ['restaurants'],
    })
    @Get('restaurants/search')
    async findByRestaurantsCategory(@Query('category') category: string): Promise<RestaurantDto[]> {
        return this.restaurantService.findRestaurantsByCategory(category);
    }

    @CustomApiOperation({
        summary: '단일 식당 조회',
        tags: ['restaurants'],
    })
    @Get('restaurants/:id')
    async findRestaurantById(@Param('id') restaurantId: number): Promise<RestaurantDto> {
        return this.restaurantService.findRestaurantById(restaurantId);
    }

    @CustomApiOperation({
        summary: '식당 등록',
        tags: ['restaurants'],
    })
    @Post('restaurants')
    async createRestaurant(@Body() dto: CreateRestaurantDto): Promise<RestaurantDto> {
        const restaurant = await this.restaurantService.createRestaurant(dto);
        return this.restaurantService.findRestaurantById(restaurant.id);
    }

    @CustomApiOperation({
        summary: '식당 카테고리 수정',
        tags: ['restaurants'],
    })
    @Patch('restaurants/:id')
    async updateRestaurant(
        @Body() dto: UpdateRestaurantDto,
        @Param('id') restaurantId: number
    ) : Promise<RestaurantDto> {
        const restaurant = await this.restaurantService.updateRestaurant(restaurantId, dto);
        return this.restaurantService.findRestaurantById(restaurant.id);
    }

    @CustomApiOperation({
        summary: '식당 삭제',
        tags: ['restaurants'],
    })
    @Delete('restaurants/:id')
    async deleteRestaurant(@Param('id') restaurantId: number): Promise<void> {
        await this.restaurantService.removeRestaurant(restaurantId);
    }
}