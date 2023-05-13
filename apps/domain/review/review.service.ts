import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {RestaurantService} from "../restaurant/restaurant.service";
import {UpdateReviewDto} from "./dto/update-review.dto";
import {ReviewDto} from "./dto/review.dto";
import {plainToInstance} from "class-transformer";
import {array} from "joi";

@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly restaurantService: RestaurantService,
    ) {}

    // 리뷰 등록
    async createReview(restaurantId: number, dto: CreateReviewDto): Promise<Review> {
        const restaurant = await this.restaurantService.getOneById(restaurantId);
        const review = new Review();
        review.title = dto.title;
        review.content = dto.content;
        review.restaurant = restaurant;
        await this.reviewRepository.save(review);

        return review;
    }

    // 레스토랑 수정
    async updateReview(reviewId: number, dto: UpdateReviewDto): Promise<Review> {
        const review = await this.getOneById(reviewId);
        review.title = dto.title;
        review.content = dto.content;

        await this.reviewRepository.save(review);
        return review;
    }

    // 리뷰 조회
    async findReviewById(reviewId: number): Promise<ReviewDto> {
        const review = await this.getOneById(reviewId);
        return plainToInstance(ReviewDto, {
            restaurantName: review.restaurant.name, ...review
        });
    }

    async findReviewsByRestaurantId(restaurantId: number): Promise<ReviewDto[]> {
        const reviews = await this.reviewRepository.find({
            where: {
                restaurant: {id: restaurantId}
            },
            relations: ['restaurant']
        })
        return reviews.map(review => plainToInstance(ReviewDto, {
            restaurantName: review.restaurant.name,
            ...review
        }));
    }


    //레스토랑 삭제 (Soft Delete)
    async removeReview(id: number): Promise<void> {
        const review = await this.getOneById(id);
        await this.reviewRepository.remove(review);
    }


    async getOneById(id: number): Promise<Review> {
        return await this.reviewRepository.findOne({
            where: {
                id,
            },
            relations: ['restaurant']
        })
    }
}