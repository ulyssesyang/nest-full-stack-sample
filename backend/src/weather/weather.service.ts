import { Injectable } from '@nestjs/common';
@Injectable()
export class WeatherService {
    constructor() {
        
    }

    public async findByLocation(location: string) {
        return {test: 'ok'}
    }
}
