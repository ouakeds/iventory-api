import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from './schemas/agency.schema';
import { AgencyService } from './agency.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }]),
  ],
  providers: [AgencyService],
  exports: [AgencyService], // Exporting the service to be used in the UserModule
})
export class AgencyModule {}
