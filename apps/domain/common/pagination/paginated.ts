import {PaginationMetaData} from "./pagination-meta-data.dto";
import {Type} from "@nestjs/common";


export interface IPaginated<T> {
    items: T[];
    pagination: PaginationMetaData;
}

export function BasePaginatedDto<D>(
    DtoClass: Type<D>,
    resourceName?: string,
): Type<IPaginated<D>> {

    class PaginatedHost<D> implements IPaginated<D> {
        items: D[];
        pagination: PaginationMetaData;

        constructor(
            items: D[],
            totalItemCount: number,
            currentPage: number,
            itemsPerPage: number,
        ) {
            // Math.ceil -> 올림
            const totalPage = Math.ceil(totalItemCount / itemsPerPage);

            this.items = items;
            this.pagination = {
                totalItemCount,
                currentItemCount: items.length,
                totalPage: totalPage === 0 ? 1 : totalPage,
                currentPage,
                itemsPerPage,
            };
        }
    }

    if (resourceName) {
        /**
         * Object.defineProperty(obj, prop, descriptor)
         * 객체에 새로운 속성을 직접 정의하거나 이미 존재하는 속성 수정
         * obj: 속성을 정의할 객체, prop: 새로 정의하거나 수정하려는 속성의 이름
         * descriptor: 속성 서술자(writable: 속성의 값을 바꿀 수 있는지, value: 속성의 값)
         * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
         */
        Object.defineProperty(PaginatedHost, 'name', {
            writable: false,
            value: `Paginated${resourceName}ListDto`,
        });
    }

    return PaginatedHost;
}

export class Paginated<E> implements IPaginated<E> {
    items: E[];
    pagination: PaginationMetaData;

    constructor(
        items: E[],
        totalItemCount: number,
        currentPage: number,
        itemsPerPage: number,
    ) {
        const totalPage = Math.ceil(totalItemCount / itemsPerPage);

        this.items = items;
        this.pagination = {
            totalItemCount,
            currentItemCount: items.length,
            totalPage: totalPage === 0 ? 1 : totalPage,
            currentPage,
            itemsPerPage,
        }
    }
}