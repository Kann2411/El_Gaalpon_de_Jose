import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
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
    // ✔️ Log para desarrollo (usar Logger en producción)
    console.log('Perfil recibido:', profile);

    // Verifica que haya emails en el perfil
    if (!profile?.emails?.[0]?.value) {
      throw new UnauthorizedException('No se pudo obtener el email del perfil de Google');
    }

    // Construye el nombre completo
    const name = profile.displayName || 
      `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();

    // Retorna la información necesaria
    return {
      id: profile.id,
      email: profile.emails[0].value,
      name,
      picture: profile.photos?.[0]?.value || '', // Foto opcional
    };
  }
}
