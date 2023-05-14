import {PaginateDto} from "../../common/pagination/paginate.dto";
import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";
import {StringToBooleanTransformer} from "../../../infrastructure/transformer/string-to-boolean.transformer";

export class FindAllReviewsWithPaginationDto extends PaginateDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsBoolean()
    @IsOptional()
    @Transform(StringToBooleanTransformer)
    sortDesc?: boolean = true;

    @IsNumber()
    @Type(() => Number)
    restaurantId: number
}