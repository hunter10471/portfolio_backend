import { CreateProjectDto } from './dto/project.dto';
import { Project, ProjectDocument } from './../schemas/project.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private project: Model<ProjectDocument>,
  ) {}
  async create(data: CreateProjectDto): Promise<Project> {
    try {
      const createdProject = new this.project(data);
      return await createdProject.save();
    } catch (error) {
      throw new HttpException(
        'There was an error creating new project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll(): Promise<Project[]> {
    try {
      const projects = await this.project.find().exec();
      return projects;
    } catch (error) {
      throw new HttpException(
        'There was an error getting all projects.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
