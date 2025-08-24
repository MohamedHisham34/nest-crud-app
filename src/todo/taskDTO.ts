import { IsNotEmpty } from "class-validator"
import { states } from "./states"

export class TaskDTO {

    @IsNotEmpty()
    task_id: number

    @IsNotEmpty()
    task_details: string

    @IsNotEmpty()
    task_state: states
    
    @IsNotEmpty()
    task_createdAt: any
} 