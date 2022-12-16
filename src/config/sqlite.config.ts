export const config = () => ({
  database: {
    name: process.env.DATABASE_NAME,
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_DB,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
  },
});
