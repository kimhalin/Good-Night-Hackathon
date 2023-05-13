import {Restaurant} from "../domain/restaurant/restaurant.entity";
import {Review} from "../domain/review/review.entity";
import {DynamicModule, Global, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

const dotenv = require('dotenv');
dotenv.config();

const entities = [
    Restaurant,
    Review
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                const config = {
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE
                };

                return {
                    type: 'mysql',
                    ...config,
                    autoLoadEntities: true,
                    synchronize: true,
                    dropSchema: false,
                    timezone: 'Z',
                }
            }
        }),
        TypeOrmModule.forFeature(entities),
    ],
    exports: [TypeOrmModule],
})
export class InfrastructureModule {
    public static forRoot(): DynamicModule {
        initializeTransactionalContext();
        patchTypeORMRepositoryWithBaseRepository();

        return {
            module: InfrastructureModule,
        }
    }
}