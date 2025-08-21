import { Body, Controller, Get, Header, Headers, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserDto as UserDto } from './user.dto';
import { AuthService } from './auth.service';
import express from 'express';
import { userInfo } from 'node:os';


@Controller('auth')
export class AuthController {
    constructor(
        private authservices: AuthService,
        private userDTO: UserDto

    ) { }

    // Post Method For Adding User
    @Post('register')
    async addUser(
        @Body() userdata: UserDto,
        @Req() req: express.Request
    ) {



        const Isvalid = await this.authservices.validate(req.cookies['myToken'] || "NO Cookie Found of this Name")
        if (!Isvalid) {
            throw new UnauthorizedException("Token Expired")
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
        return decodeValue[`${this.userDTO.user_name}`];
    }

}
