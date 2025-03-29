import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Report.name, schema: ReportSchema },]),
    AwsModule,],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
