/**
 * @fileoverview application/tag/cntlr/tag_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/dfn');
const TAG_SVC = require('../svc/tag_svc');

/**
 * @description 모든 태그 리스트 로드 API
 */
exports.getTagList = async (req, res) => {
    let conn = null;

    try {
        const { ty } = req.query;

        const tagTy = parseInt(ty, 10);

        if (Number.isFinite(tagTy)) {
            conn = await MYSQL.getConn();

            const tagList = await TAG_SVC.getTagList({ conn, tagTy });

            res.send({
                tagList,
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
