import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get('listar')
  async listar(): Promise<Aluno[]> {
    return this.alunoService.listarTodos();
  }

  @Get('aluno/:id')
  async buscarPorId(@Param('id') id: string): Promise<Aluno> {
    return this.alunoService.buscarPorId(Number(id));
  }

  @Post('criar')
  async criar(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoService.criar(createAlunoDto);
  }

  @Delete('remover/:id')
  async remover(@Param('id') id: string): Promise<void> {
    return this.alunoService.remover(Number(id));
  }

  @Put('atualizar/:id')
  async atualizar(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ): Promise<Aluno> {
    return this.alunoService.atualizar(Number(id), updateAlunoDto);
  }
}
