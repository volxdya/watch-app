import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { STATIC_CONFIG } from './';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/user.model';
import { VideoModel } from 'src/core/video/video.model';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { THROTTLER_CONFIG } from './throttler.config';
import { APP_GUARD } from '@nestjs/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot(STATIC_CONFIG),
    ThrottlerModule.forRoot(THROTTLER_CONFIG),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), '../schema.gql'),
      sortSchema: true,
      path: '/api/graphql',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USERNAME,
      autoLoadModels: true,
      models: [UserModel, VideoModel],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class MyConfigModule {}
