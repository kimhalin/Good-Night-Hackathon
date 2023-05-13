import {IsString} from "class-validator";

export class CreateReviewDto {
    /**
     * 레스토랑명
     */
    @IsString()
    title: string;

    /**
     * 카테고리
     */
    @IsString()
    content: string;
}