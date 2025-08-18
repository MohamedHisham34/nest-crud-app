import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(public authservices: AuthService) { }

    // Post Method For Adding User
    @Post('login')
    addUser(@Body() userdata: LoginDto) {

        return this.authservices.addUser(userdata);

    }

// get All Users From Datbase
    @Get('getAllUsers')
    getAllUsers() {
        return this.authservices.getAllUsers();
    }

}
