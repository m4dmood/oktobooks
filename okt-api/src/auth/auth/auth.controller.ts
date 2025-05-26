import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {}

    @Post('login')
    async login(@Body() body: any) {
        const { username, password } = body;

        try {
            const u = await this.userService.findByUsername(username);
            console.log("User found");

            if (u && u.username === username && u.password === password) {
                console.log("Credentials OK");
                return {
                    access_token: 'mocked-jwt-token',
                    user: {
                        id: u.id,
                        username: u.username
                    }
                };
            } else {
                console.error("Invalid credentials");
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (e) {
            throw new UnauthorizedException(e?.message || 'Login failed');
        } 
    }
}
