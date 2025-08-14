import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryPostsModule } from './modules/category-posts/category-posts.module';
import { MediasModule } from './modules/medias/medias.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Caminho do diretório onde as imagens estão
      serveRoot: '/uploads', // URL que será utilizada para acessar as imagens
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    CategoryPostsModule,
    PostsModule,
    MediasModule,
    SettingsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
