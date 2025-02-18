import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/decorators/public.decorator'; 
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilterClassroomDto } from './dto/filter-classroom.dto';

@ApiBearerAuth()
@ApiTags('Classrooms')
@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {
  constructor(private readonly classroomService: ClassroomsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une salle' })
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister toutes les salles' })
  async findAll() {
    return this.classroomService.findAll();
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtrer les salles' })
  async findFiltered(@Query() filters: FilterClassroomDto) {
    return this.classroomService.findFiltered(filters);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une salle par ID' })
  async findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier une salle' })
  async update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Supprimer une salle' })
  async remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
