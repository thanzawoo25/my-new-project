import { Pool } from "pg"

export const db = new Pool({
    host: 'localhost',
    user: "postgres",
    port:5432,

    password:"97120",
    database: 'foodie_pos_db',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis:2000
})