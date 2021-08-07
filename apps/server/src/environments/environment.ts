export const environment = {
  production: false,
  port: process.env.SERVER_PORT,
  jwt_secret: process.env.JWT_SECRET,
  dbHost: process.env.MYSQL_HOST,
  dbPort: process.env.MYSQL_PORT,
  dbDatabase: process.env.MYSQL_DABATASE,
  dbUsername: process.env.MYSQL_USERNAME,
  dbPassword: process.env.MYSQL_PASSWORD,
}
