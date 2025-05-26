import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('find-all')
    findAll() {
        return [
            { id: 1, username: 'admin', role: 'ROLE_ADMIN' },
            { id: 2, username: 'user', role: 'ROLE_USER' },
        ];
    }

    @Get('me')
    getCurrent() {
        
    }
}
