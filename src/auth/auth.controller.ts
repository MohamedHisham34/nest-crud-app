import { BadRequestException, Body, Controller, Get, Header, Headers, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserDto as UserDto } from './user.dto';
import { AuthService } from './auth.service';
import express from 'express';
import { DataSource } from 'typeorm';



@Controller('auth')
export class AuthController {
    constructor(
        private authservices: AuthService,
        private userDTO: UserDto,

    ) { }

    // Post Method For Adding User
    @Post('register')
    async addUser(
        @Body() userdata: UserDto,
    ) {

        await this.authservices.addUser(userdata);
        return { message: "User Added" }
    }


    @Post('login')
    async login(
        @Body('user_name') user_name: string,
        @Body('password') password: string,
        @Res() res: express.Response,
    ) {
        const userRecord = await this.authservices.validateUser(user_name, password);

        if (!userRecord) {
            throw new BadRequestException('User Not Found');
        }

        // Build user object for token
        const userForToken = {
            id: userRecord.user_id,
            user_name,
            role: userRecord.roles,
        };

        console.log(userForToken)

        const token = await this.authservices.getToken(userForToken);

        res.cookie("myToken", token);
        return res.json({ message: "Login success", token });
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


    @Post('token')
    async getToken(
        @Res() res: express.Response,
        @Body() userDTO: UserDto
    ) {
        const token = await this.authservices.getToken(userDTO);
        res.cookie("myToken", token)
        return res.send({
            message: 'Token generated and stored in cookie',
            token: token,
        }
            ,
        );
    }



    @Get('testDecode')
    decodeToken(
        @Req() req: express.Request
    ) {
        const jwtToken = req.cookies['myToken'];
        const decodeValue = this.authservices.decodeToken(jwtToken)
        console.log(decodeValue);
        return decodeValue[`role`] || "No Token Found";
    }
}
