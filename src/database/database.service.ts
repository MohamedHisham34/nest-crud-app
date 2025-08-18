import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(private dataSource: DataSource) { }



    async checkDB() {
        try {
            await this.dataSource.query('Select 1');
            return { state: "OK", message: "database running" }


        } catch (e) {
            return { message: `Database Not Running--------- ${e}` }
        }
    }











}
