import { Body, Controller, Get, Header, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UserDto as UserDto } from './user.dto';
import { AuthService } from './auth.service';
import { promises } from 'dns';

@Controller('auth')
export class AuthController {
    constructor(public authservices: AuthService) { }

    // Post Method For Adding User
    @Post('register')
    addUser(
        @Body() userdata: UserDto,
        @Headers('token') usedtoken: string,
    ) {
        if (usedtoken !== "Real Token") {
            throw new UnauthorizedException('invalid token')
        }

        else {
            return this.authservices.addUser(userdata);
        }


    }

    


    // get All Users From Datbase
    @Get('getAllUsers')
    getAllUsers() {
        return this.authservices.getAllUsers();
    }


    @Get('userID=:id')
    findOne(@Param('id') id: number): any {
        return this.authservices.getOneUser(id);
    }

}
