module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    serverPort: process.env.DEV_SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET,
    countryCode: process.env.COUNTRY_CODE,
    apiKey: process.env.API_KEY
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT,
    serverPort: process.env.TEST_SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET,
    countryCode: process.env.COUNTRY_CODE,
    apiKey: process.env.API_KEY
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: process.env.PROD_DB_DIALECT,
    serverPort: process.env.PROD_SERVER_PORT,
    jwtSecret: process.env.JWT_SECRET,
    countryCode: process.env.COUNTRY_CODE,
    apiKey: process.env.API_KEY
  }
}
