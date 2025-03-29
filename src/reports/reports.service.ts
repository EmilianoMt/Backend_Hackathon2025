import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
      @InjectModel(Report.name) 
      private ReportRepository: Model<Report>;

  create(createReportDto: CreateReportDto) {
    console.log(createReportDto);
    
    const report = new this.ReportRepository({
      analysis: "Los resultados de la prueba son positivos",
      ...createReportDto
    });

    report.save();
    return report;
  }

  findAll() {
    return this.ReportRepository.find();
  }

  findByUserId(userId: string) {
    return this.ReportRepository.find({ userId }).exec(); 
  }



  remove(id: number) {
    return this.ReportRepository.deleteOne({ id }).exec();
  }
}
