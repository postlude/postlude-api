/**
 * @fileoverview application/dev_link/cntlr/dev_link_cntlr.js
 */

const MYSQL = require('@/config/mysql');
const { RSPNS } = require('@/config/dfn');
const DEV_LINK_SVC = require('../svc/dev_link_svc');

/**
 * @description 개발 문서 생성 API
 */
exports.addLink = async (req, res) => {
    let conn = null;

    try {
        const { devLink, tagAry } = req.body;

        if (devLink && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_LINK_SVC.addLink({ conn, devLink, tagAry });

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
exports.rmLink = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const devLinkIdx = parseInt(idx, 10);

        if (Number.isFinite(devLinkIdx)) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_LINK_SVC.rmLink({ conn, devLinkIdx });

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
exports.mdfyLink = async (req, res) => {
    let conn = null;

    try {
        const { devLink, tagAry } = req.body;

        if (devLink && Array.isArray(tagAry) && tagAry.length) {
            conn = await MYSQL.getConn();
            await conn.beginTransaction();

            await DEV_LINK_SVC.mdfyLink({ conn, devLink, tagAry });

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
 * @param {Object} arg { numPage, ty, srchTitle, srchAry }
 * @returns {boolean}
 */
const chckParam = (arg) => {
    const {
        numPage, ty, srchTitle, srchAry
    } = arg;

    if (Number.isFinite(numPage)) {
        if (ty === '1' && Array.isArray(srchAry) && srchAry.length) {
            return true;
        } else if (ty === '2' && srchTitle && srchTitle.length > 2) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * @description 개발 문서 검색 API
 */
exports.getLinkList = async (req, res) => {
    let conn = null;

    try {
        const {
            page, ty, srchTitle, srchTagAry
        } = req.query;

        const numPage = parseInt(page, 10);
        const srchAry = JSON.parse(srchTagAry);

        const isValidParam = chckParam({
            numPage, ty, srchTitle, srchAry
        });

        if (isValidParam) {
            conn = await MYSQL.getConn();

            const result = await DEV_LINK_SVC.getLinkList({
                conn, numPage, ty, srchTitle, srchAry
            });

            res.send({
                ...result,
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

/**
 * @description 개발 문서 1개 로드 API
 */
exports.getLink = async (req, res) => {
    let conn = null;

    try {
        const { idx } = req.params;

        const devLinkIdx = parseInt(idx, 10);

        if (Number.isFinite(devLinkIdx)) {
            conn = await MYSQL.getConn();

            const result = await DEV_LINK_SVC.getLinkByIdx({ conn, devLinkIdx });

            res.send({
                ...result,
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
