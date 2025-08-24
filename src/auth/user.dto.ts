import { isEnum, isInt, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';
import { roles } from './roles';

export class UserDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  user_name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'roles must be Not Empty' })
  role : roles

}
