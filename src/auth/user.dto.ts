import { isInt, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  user_name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;


}
