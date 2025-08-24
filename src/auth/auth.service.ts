import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private dataSource: DataSource
        , private jwtService: JwtService
    ) { }



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


    async validateUser(user_name: string, password: string) {
        const rows = await this.dataSource.query(
            'SELECT user_id, roles FROM users WHERE user_name = ? AND password = ?',
            [user_name, password]
        );


        if (rows.length === 0) {
            return null;
        }
        return rows[0]; // { user_id: 1, role: 'admin' }
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
    async getToken(user: { id: number; user_name: string; role: string }) {
        const payload = {
            user_id: user.id,
            user_name: user.user_name,
            role: user.role
        };
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


    decodeToken(token: string) {

        return this.jwtService.decode(token);
    }

}
