import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
  ],
})
export class AppModule {
  @InjectConnection() private readonly connection: Connection;
  async onApplicationBootstrap() {
    try {
      const connected = await this.connection.asPromise();
      connected && Logger.log('Connected to database successfully.');
    } catch (error) {
      Logger.error(error);
    }
  }
}
