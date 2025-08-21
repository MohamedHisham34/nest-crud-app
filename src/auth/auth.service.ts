import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private dataSource: DataSource
        , private jwtService: JwtService
    ) {}



    // Add New Users 
    async addUser(userData: UserDto) {
        try {

            const checkQuery = await this.dataSource.query(
                'SELECT * FROM users WHERE user_id = ?',
                [userData.id]
            );

            if (checkQuery.length > 0) {
                throw new BadRequestException('Id Already Exists');
            }

            await this.dataSource.query(
                'INSERT INTO users (user_id, user_name, password) VALUES (?, ?, ?)',
                [userData.id, userData.user_name, userData.password]
            );

            return { message: 'User Added Successfully' };
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException(`Error Occurred: ${e}`);
        }
    }


    // Get All Users From Database

    async getAllUsers() {
        try {
            const users = await this.dataSource.query('SELECT * FROM users');
            return { message: 'Done', data: users };
        } catch (e) {
            throw new InternalServerErrorException(`Error: ${e}`);
        }
    }


    // Get Only one User by Params
    async getOneUser(userID: number) {
        try {
            const userData = await this.dataSource.query(
                'SELECT * FROM users WHERE user_id = ?',
                [userID]
            );
            return { message: 'Done', data: userData };
        } catch (e) {
            throw new InternalServerErrorException(`Error: ${e}`);
        }
    }



    // Generate Token
    async getToken(userDTO: UserDto) {
        const payload = { user_name: userDTO.user_name, user_id: userDTO.id }
        return this.jwtService.sign(payload, { secret: '01141288661', expiresIn: '1h' });
    }


    async validate(token: string) {
        try {
            await this.jwtService.verify(token, { secret: '01141288661' })
            console.log("true")
            return true

        }
        catch (e) {
            console.log("false")
            return false
        }

    }
}
