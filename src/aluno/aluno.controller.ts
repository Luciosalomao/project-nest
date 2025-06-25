import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import { Controller, Get, Param } from '@nestjs/common';


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

}
