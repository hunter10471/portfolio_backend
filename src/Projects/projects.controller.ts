import { CreateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  async getAllProjects() {
    try {
      return await this.projectService.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createProject(@Body() data: CreateProjectDto) {
    try {
      if (data) {
        return await this.projectService.create(data);
      } else {
        throw new HttpException(
          'All fields must be provided to create project.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
