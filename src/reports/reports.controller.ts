import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';


@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly awsService: AwsService
  ) {}

  @Post("/report")
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createReportDto: CreateReportDto, @UploadedFile() file: Express.Multer.File) {
    console.log(createReportDto);
    console.log(file);
    if (!file) {
      return this.reportsService.create(createReportDto);
    } else {
      const fileUrl = await this.awsService.uploadFile(file);
      createReportDto.file = fileUrl;

      return this.reportsService.create(createReportDto);
    };
  }
 

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('/user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.reportsService.findByUserId(userId);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
