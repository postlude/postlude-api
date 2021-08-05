/**
 * @fileoverview application/user/cntlr/user_cntlr.js
 */

const { RSPNS } = require('@/config/dfn');
const MYSQL = require('@/config/mysql');
const USER_SVC = require('../svc/user_svc');

/**
 * @description 로그인 파라미터 체크
 * @param {Object} arg { user }
 * @returns {boolean}
 */
const chckSgnnParam = (arg) => {
    const { user } = arg;

    if (user) {
        const { email, pw } = user;
        if (email && pw) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * @description 로그인 API
 */
const sgnn = async (req, res) => {
    let conn = null;

    try {
        const { user } = req.body;

        const isValid = chckSgnnParam({ user });

        if (isValid) {
            conn = await MYSQL.getConn();
            const tkn = await USER_SVC.sgnn({ conn, user });

            res.send({
                tkn,
                ...RSPNS.SUCCES
            });
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

module.exports = {
    sgnn
};
