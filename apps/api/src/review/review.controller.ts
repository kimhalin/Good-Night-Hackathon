import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {ReviewService} from "../../../domain/review/review.service";
import {UpdateReviewDto} from "../../../domain/review/dto/update-review.dto";
import {CreateReviewDto} from "../../../domain/review/dto/create-review.dto";
import {ReviewDto} from "../../../domain/review/dto/review.dto";
import {FindAllReviewsWithPaginationDto} from "../../../domain/review/dto/find-all-reviews-with-pagination.dto";
import {IPaginated} from "../../../domain/common/pagination/paginated";
import {CustomApiOperation} from "../../../infrastructure/swagger/decorators";

@Controller()
export class ReviewController {

    constructor(private readonly reviewService: ReviewService) {}

    @CustomApiOperation({
        summary: '해당 레스토랑의 리뷰 조회 (pagination)',
        tags: ['reviews'],
    })
    @Get('reviews')
    async findReviewsByRestaurantId(
        @Query() dto: FindAllReviewsWithPaginationDto
    ): Promise<IPaginated<ReviewDto>> {
        return this.reviewService.findAllWithPagination(dto);
    }

    @CustomApiOperation({
        summary: '단일 리뷰 조회',
        tags: ['reviews'],
    })
    @Get('reviews/:id')
    async findReviewById(@Param('id') reviewId: number): Promise<ReviewDto> {
        return this.reviewService.findReviewById(reviewId);
    }

    @CustomApiOperation({
        summary: '리뷰 생성',
        tags: ['reviews'],
    })
    @Post('reviews')
    async createReview(
        @Body() dto: CreateReviewDto,
        @Query('restaurant') restaurantId: number
    ): Promise<ReviewDto> {
        const review = await this.reviewService.createReview(restaurantId, dto);
        return this.reviewService.findReviewById(review.id);
    }

    @CustomApiOperation({
        summary: '리뷰 삭제',
        tags: ['reviews'],
    })
    @Delete('reviews/:id')
    async deleteReview(@Param('id') reviewId: number): Promise<void> {
        await this.reviewService.removeReview(reviewId);
    }

    @CustomApiOperation({
        summary: '리뷰 수정',
        tags: ['reviews'],
    })
    @Patch('reviews/:id')
    async updateReview(
        @Body() dto: UpdateReviewDto,
        @Param('id') reviewId: number
        ): Promise<ReviewDto> {

        const review = await this.reviewService.updateReview(
            reviewId,
            dto
        );
        return this.reviewService.findReviewById(review.id);
    }

}