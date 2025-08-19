import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private dataSource: DataSource) {}

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

    async getAllUsers() {
        try {
            const users = await this.dataSource.query('SELECT * FROM users');
            return { message: 'Done', data: users };
        } catch (e) {
            throw new InternalServerErrorException(`Error: ${e}`);
        }
    }

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
}
