import { Module, CorsModule } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CorsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AgencyModule,
    AuthModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
