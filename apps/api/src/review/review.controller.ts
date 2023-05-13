import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {RestaurantDto} from "../../../domain/restaurant/dto/restaurant.dto";
import {RestaurantService} from "../../../domain/restaurant/restaurant.service";
import {ReviewService} from "../../../domain/review/review.service";
import {UpdateReviewDto} from "../../../domain/review/dto/update-review.dto";
import {CreateRestaurantDto} from "../../../domain/restaurant/dto/create-restaurant.dto";
import {CreateReviewDto} from "../../../domain/review/dto/create-review.dto";
import {Review} from "../../../domain/review/review.entity";

@Controller()
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    @Get('reviews')
    async findReviewsByRestaurantId(@Query('restaurant') restaurantId: number): Promise<Review[]> {
        return this.reviewService.findReviewsByRestaurantId(restaurantId);
    }

    @Get('reviews/:id')
    async findReviewById(@Param('id') reviewId: number): Promise<Review> {
        return this.reviewService.findReviewById(reviewId);
    }

    @Post('reviews')
    async createReview(
        @Body() dto: CreateReviewDto,
        @Query('restaurant') restaurantId: number
    ): Promise<void> {
        await this.reviewService.createReview(restaurantId, dto);
    }

    @Delete('reviews/:id')
    async deleteReview(@Param('id') reviewId: number): Promise<void> {
        await this.reviewService.removeReview(reviewId);
    }

    @Patch('reviews/:id')
    async updateReview(
        @Body() dto: UpdateReviewDto,
        @Param('id') reviewId: number
        ): Promise<void> {
        await this.reviewService.updateReview(reviewId, dto);
    }
}