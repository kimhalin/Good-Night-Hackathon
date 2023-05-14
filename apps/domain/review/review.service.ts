import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Review} from "./review.entity";
import {CreateReviewDto} from "./dto/create-review.dto";
import {RestaurantService} from "../restaurant/restaurant.service";
import {UpdateReviewDto} from "./dto/update-review.dto";
import {ReviewDto} from "./dto/review.dto";
import {plainToInstance} from "class-transformer";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {RestaurantDto} from "../restaurant/dto/restaurant.dto";
import {FindAllReviewsWithPaginationDto} from "./dto/find-all-reviews-with-pagination.dto";
import {IPaginated, Paginated} from "../common/pagination/paginated";

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
        return plainToInstance(ReviewDto, reviews);
    }


    /**
     * FindAllReviewsWithPaginationDto (query parameter로 받았을 당시)에 설정해준 default 값이 들어가지 않는다 ..!!
     */
    async findAllWithPagination(
        dto: FindAllReviewsWithPaginationDto,
    ): Promise<IPaginated<ReviewDto>> {
        console.log(typeof dto.page);
        const qb = this.reviewRepository
            .createQueryBuilder('review')
            .leftJoinAndSelect(
                'review.restaurant',
                'restaurant',
            ).where('review.restaurantId = :restaurantId', {restaurantId: dto.restaurantId})
            .skip((dto.page-1) * dto.itemsPerPage)
            // getter의 문제?
            // dto의 값이 아직도 string으로 온다 -> 변환 x
            .take(dto.itemsPerPage);

        if (dto.content) {
            qb.andWhere('review.content like :content', {content: `%${dto.content}%`})
        }

        if (dto.title) {
            qb.andWhere('review.title like :title', {title: `%${dto.title}%`})
        }

        if (dto.sortDesc) {
            qb.orderBy('review.createdAt', 'DESC');
        } else {
            qb.orderBy('review.createdAt', 'ASC');
        }

        const [items, count] = await qb.getManyAndCount();

        return new Paginated(
            plainToInstance(ReviewDto, items),
            count,
            dto.page,
            dto.itemsPerPage,
        );
    }

    async paginate(options: IPaginationOptions, desc: boolean=true): Promise<Pagination<Review>> {
        const queryBuilder = this.reviewRepository.createQueryBuilder('review');
        if (desc) {
            queryBuilder.orderBy('review.createdAt', 'DESC'); // Or whatever you need to do
        } else {
            queryBuilder.orderBy('review.createdAt', 'ASC'); // Or whatever you need to do
        }
        return paginate<Review>(queryBuilder, options);
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