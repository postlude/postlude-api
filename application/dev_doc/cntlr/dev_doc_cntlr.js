/**
 * @fileoverview application/dev_doc/cntlr/dev_doc_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/dfn');
const DEV_DOC_SVC = require('../svc/dev_doc_svc');

/**
 * @description 개발 문서 생성 API
 */
exports.addDoc = async (req, res) => {
    let conn = null;

    try {
        const { devDoc, tagAry } = req.body;

        if (devDoc && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_DOC_SVC.addDoc({
                conn, devDoc, tagAry
            });

            await conn.commit();
            res.send(RSPNS.SUCCES);
        } else {
            res.send(RSPNS.FAIL_INVLD_FIELD);
        }
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }
        console.error(err);
        res.send(err.rspns || RSPNS.FAIL);
    } finally {
        if (conn) {
            conn.release();
        }
    }
};
