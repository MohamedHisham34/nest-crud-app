import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    @Post('login')
    login(@Body() loginDto: LoginDto) {

        const username = loginDto.username;
        const password = loginDto.password;
        return {message : "Task Done"}

        
        // // just demo response
        // if (username === 'admin' && password === '1234') {
        //     return { message: 'Login successful', token: 'fake-jwt-token' };
        // } else {
        //     return { message: 'Invalid credentials' };
        // }
    }

}
