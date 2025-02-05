import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-guard';
import { Public } from '../auth/decorators/public.decorator'; 

@ApiBearerAuth()
@ApiTags('Classrooms')
@UseGuards(JwtAuthGuard) 
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

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
  @ApiOperation({ summary: 'Supprimer une salle' })
  async remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
