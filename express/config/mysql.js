/**
 * @fileoverview config/mysql.js
 * @typedef { import('mysql2/promise').Connection } connection
 */

const mysql = require('mysql2');
const {
    MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_USER_PASSWORD
} = require('./env');

const pool = mysql.createPool({
    host: MYSQL_HOST || 'localhost',
    port: MYSQL_PORT || 3306,
    user: MYSQL_USER || 'root',
    password: MYSQL_USER_PASSWORD || 'root',
    database: 'postlude',
    connectionLimit: 20, // The maximum number of connections to create at once
    waitForConnections: true, // [default] Determines the pool's action when no connections are available and the limit has been reached.
    queueLimit: 0, // [default] The maximum number of connection requests the pool will queue before returning an error from getConnection.
    namedPlaceholders: true, // https://github.com/sidorares/node-mysql2/blob/master/documentation/Extras.md#named-placeholders
    decimalNumbers: true // DECIMAL and NEWDECIMAL types always returned as string unless you pass this config option
    // debug: ['ComQueryPacket', 'RowDataPacket']
});

const promisePool = pool.promise();

/**
 * @description 커넥션 획득
 * @returns {connection}
 */
const getConn = async () => {
    try {
        const conn = await promisePool.getConnection();
        return conn;
    } catch (err) {
        console.error('[MySQL] getConn : CONNECTION ERROR');
        throw err;
    }
};

/**
 * @description 커넥션 획득 테스트
 */
const testConn = async () => {
    let conn = null;
    try {
        conn = await getConn();
        console.log('[MySQL] Test Connection : SUCCESS');
    } catch (err) {
        console.error('[MySQL] Test Connection : FAIL');
        console.error(err);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

module.exports = {
    getConn,
    testConn
};
