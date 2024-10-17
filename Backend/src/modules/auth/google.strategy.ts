import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('Perfil recibido:', profile); // Imprime el perfil recibido

    if (!profile || !profile.emails || profile.emails.length === 0) {
      throw new UnauthorizedException('No se pudo obtener el perfil de Google');
    }

    const name =
      profile.displayName ||
      `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`;

    return {
      id: profile.id,
      email: profile.emails[0].value,
      name,
    };
  }
}
