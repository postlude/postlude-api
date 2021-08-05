/**
 * @fileoverview config/env.js
 */

const {
    NODE_ENV,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_USER_PASSWORD,
    JWT_SECRET
} = process.env;

module.exports = {
    NODE_ENV,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_USER_PASSWORD,
    JWT_SECRET
};
