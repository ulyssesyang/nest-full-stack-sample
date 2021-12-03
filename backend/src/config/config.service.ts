import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const TO_ROOT = '../../';
        const defaultEnvFilePath = join(__dirname, TO_ROOT, `env/default.env`);
        const envConfig = dotenv.parse(fs.readFileSync(defaultEnvFilePath));

        process.env.MONGO_HOST = envConfig.MONGO_HOST;
        process.env.NODE_ENV = envConfig.NODE_ENV;

        const ENV_PATH = join(__dirname, TO_ROOT, `env/${process.env.NODE_ENV}.env`);

        this.envConfig = dotenv.config({ path: ENV_PATH }).parsed || {};

        // Development Local Computer Testing -> Connection to Dev Database
        if (process.env.MONGO_HOST && process.env.MONGO_HOST !== 'undefined') {
            this.envConfig.MONGODB_URI = this.envConfig.MONGODB_URI.replace('localhost', envConfig.MONGO_HOST);
        }
    }

    public isProduction() {
        return (process.env.NODE_ENV === 'production');
    }

    public getEnv(key: string): string {
        return this.envConfig[key];
    }

    public getNumber(key: string): number {
        return parseInt(this.envConfig[key]);
    }
}
