import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) 
    private readonly ReportRepository: Model<Report>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    console.log('Creating report with data:', createReportDto);

    const report = new this.ReportRepository({
      analysis: "Los resultados de la prueba son positivos",
      ...createReportDto,
    });

    // Espera a que el documento se guarde en la base de datos
    const savedReport = await report.save();
    return savedReport;
  }

  findAll() {
    return this.ReportRepository.find();
  }

  findByUserId(userId: string) {
    return this.ReportRepository.find({ userId }).exec(); 
  }

  async remove(id: number) {
    return this.ReportRepository.deleteOne({ id }).exec();
  }
}