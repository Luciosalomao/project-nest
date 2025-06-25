import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async listarTodos(): Promise<Aluno[]> {
    return this.alunoRepository.find();
  }
  
  async buscarPorId(id: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }

    return aluno;
  }

}
