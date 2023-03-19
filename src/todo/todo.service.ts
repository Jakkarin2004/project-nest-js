import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
//ตัวจัดเก็บข้อมูลโดยจะส่ง ไปให้ module และ module จะส่งไปให้ database
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ){}
    
  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  findAll() {
    return this.todoRepository.find();
  }
  // http://localhost:3000/todo/1 การหาข้อมูล /1 คือ id ตัวที่จะหา
  findOne(id: number) {
    return this.todoRepository.findBy({
      id:id});
  }
//อัปเดต
  update(id: number, updateTodoDto: any) {
    return this.todoRepository.save({
      id:id,
      title:updateTodoDto.title,
      username:updateTodoDto.username,
      status:updateTodoDto.status
    });
  }
  // http://localhost:3000/todo/1 ลบไอดีที่ 1 
  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
