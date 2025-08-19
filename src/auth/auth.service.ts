import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private dataSource: DataSource) { }
    async addUser(userData: UserDto) {

        try {

            await this.dataSource.query('INSERT INTO users (user_id, user_name, password) VALUES (?, ?, ?)', [userData.id, userData.user_name, userData.password])
        } catch (e) {
            return { message: `Error Occured ----- ${e}` }
        }

        return { message: "User Added Successfully" }
    }




    async getAllUsers() {
        try {
            var users = await this.dataSource.query('SELECT * FROM `users`')
            return { message: 'Done', data: users };




        } catch (e) {
            return { message: `Error ---- ${e}` }
        }
    }


    async getOneUser(userID: number) {
        try {
            var userData = await this.dataSource.query('SELECT * FROM users WHERE user_id = ?',[userID])
            return { message: 'Done', data: userData };

        } catch (e) {
            return { message: `Error ---- ${e}` }
        }

    }

}
