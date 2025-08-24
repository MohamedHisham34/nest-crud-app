import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TaskDTO } from './taskDTO';
import { DataSource } from 'typeorm';
import { states } from './states';

@Injectable()
export class TodoService {
    constructor(private dataSource: DataSource) { }


    //Add Task
    async addTask(taskData: TaskDTO) {


        await this.dataSource.query(
            'INSERT INTO tasks (task_id, task_details, task_state,task_createdAt) VALUES (?, ?, ?, ?)',
            [taskData.task_id, taskData.task_details, taskData.task_state, taskData.task_createdAt]
        )

        return { message: "TASK Added Successfully" }

    }
    // getAllTasks
    async getTasks() {
        try {
            const tasks = await this.dataSource.query('SELECT * FROM tasks');
            return { message: 'Done', data: tasks };
        } catch (e) {
            throw new InternalServerErrorException(`Error: ${e}`);
        }
    }

    async deleteTask(id: number) {
        return await this.dataSource.query(
            'DELETE FROM tasks WHERE task_id = ?',
            [id]
        );
    }


    //get Only One task 
    async getTaskById(task_id: number) {
        const task = await this.dataSource.query('SELECT * FROM tasks WHERE task_id = ?', [task_id])
        return {
            message: 'Task Found',
            data: task
        }
    }


    async changeState(task_id: number, newState: states) {
        const result = await this.dataSource.query(
            'UPDATE tasks SET task_state = ? WHERE task_id = ?',
            [newState, task_id]
        );

        if (result.affectedRows === 0) {
            return { message: 'Task not found or not updated' };
        }
        return { message: `Task state updated to ${newState}` };
    }

}
