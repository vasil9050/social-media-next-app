import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"2sql2willy000",
    database:"social_media"
})