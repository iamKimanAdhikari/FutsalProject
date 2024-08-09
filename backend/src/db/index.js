import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD
})

export default pool;