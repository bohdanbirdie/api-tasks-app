import { configService } from '../config/config.service';
import fs = require('fs');

fs.writeFileSync('ormconfig.json',
  JSON.stringify({
    ...configService.getTypeOrmConfig(),
    migrationsTableName: 'migration',

    migrations: ['migration/*.ts'],

    cli: {
      migrationsDir: 'migration',
    },
  }, null, 2)
);