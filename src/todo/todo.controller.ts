import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TaskDTO } from './taskDTO';
import { states } from './states';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Post('addTask')
    addTask(@Body() taskData: TaskDTO) {
        return this.todoService.addTask(taskData)
    }

    @Get('getTasks')
    getTasks() {
        return this.todoService.getTasks();
    }

    @Post('deleteTask')
    async deleteTask(@Body() task_id: number) {
        await this.todoService.deleteTask(task_id)
        return { message: "Task Deleted" }
    }

    @Post('getTaskById')
    async getTaskById(@Body() task_id: number) {
        console.log(task_id)
        return this.todoService.getTaskById(task_id);
    }


    @Post('updateTaskState')
    async changeState(
        @Body('task_id') task_id: number,
        @Body('newState') newState: states
    ) {
        return await this.todoService.changeState(task_id, newState)
    }



}
