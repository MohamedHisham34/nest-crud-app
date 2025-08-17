import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {

    private userList: LoginDto[] = []

    addUser(userData: LoginDto) {

        this.userList.push(userData);

        return { message: "User Added Successfully" }
    }


    usersList(): LoginDto[] {
        return this.userList;
    }
}
