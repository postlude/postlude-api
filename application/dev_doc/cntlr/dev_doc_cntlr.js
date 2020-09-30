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

            await DEV_DOC_SVC.addDoc({ conn, devDoc, tagAry });

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

/**
 * @description 개발 문서 삭제 API
 */
exports.rmDoc = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const devDocIdx = parseInt(idx, 10);

        if (Number.isFinite(devDocIdx)) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_DOC_SVC.rmDoc({ conn, devDocIdx });

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

/**
 * @description 개발 문서 수정 API
 */
exports.modifyDoc = async (req, res) => {
    let conn = null;

    try {
        const { devDoc, tagAry } = req.body;

        if (devDoc && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_DOC_SVC.modifyDoc({ conn, devDoc, tagAry });

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

/**
 * @description 문서 검색시 파라미터 체크
 * 제목 검색은 3자 이상부터 가능
 * @param {Object} arg { numPage, ty, title, tag }
 * @returns {boolean}
 */
const chckParam = (arg) => {
    const {
        numPage, ty, title, tag
    } = arg;

    if (Number.isFinite(numPage)
        && (
            (ty === '1' && tag)
            || (ty === '2' && title && title.length > 2)
        )
    ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @description 개발 문서 검색 API
 */
exports.getDocList = async (req, res) => {
    let conn = null;

    try {
        const {
            page, ty, title, tag
        } = req.query;

        const numPage = parseInt(page, 10);

        const isValidParam = chckParam({
            numPage, ty, title, tag
        });

        if (isValidParam) {
            conn = await MYSQL.getConn();

            const devDocList = await DEV_DOC_SVC.getDocList({
                conn, numPage, ty, title, tag
            });

            res.send({
                devDocList,
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
