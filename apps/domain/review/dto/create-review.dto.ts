import {IsString} from "class-validator";

export class CreateReviewDto {
    /**
     * 제목
     */
    @IsString()
    title: string;

    /**
     * 내용
     */
    @IsString()
    content: string;
}