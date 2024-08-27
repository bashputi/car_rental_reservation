import dotenv from "dotenv";
dotenv.config();


export default {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_token: process.env.ACCESS_TOKEN_SECRET,
    jwt_refresh_token: process.env.ACCESS_REFRESH_SECRET,
};