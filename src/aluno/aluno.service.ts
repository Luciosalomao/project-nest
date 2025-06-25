import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

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

  async criar(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const novoAluno = this.alunoRepository.create(createAlunoDto);
    return this.alunoRepository.save(novoAluno);
  }

  async remover(id: number): Promise<void> {
    const aluno = await this.alunoRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }

    await this.alunoRepository.remove(aluno);
  }

  async atualizar(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }

    const alunoAtualizado = Object.assign(aluno, updateAlunoDto);
    return this.alunoRepository.save(alunoAtualizado);
  }

}
