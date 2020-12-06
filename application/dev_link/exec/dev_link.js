/**
 * @fileoverview application/dev_doc/exec/dev_doc.js
 */

const DEV_LINK = require('../query/dev_link');

/**
 * @description 개발 문서 1개 INSERT
 * @param {Object} arg { conn, devLink }
 * @returns {number} devLinkIdx
 */
const insert1 = async (arg) => {
    const { conn, devLink } = arg;

    const [{ insertId }] = await conn.execute(DEV_LINK.insert1, devLink);

    return insertId;
};

/**
 * @description 개발 문서 태그 검색
 * @param {Object} arg { conn, srchAry, offset, limit }
 * @returns {Array}
 */
const select1 = async (arg) => {
    const {
        conn, srchAry, offset, limit
    } = arg;

    const [result] = await conn.query(DEV_LINK.select1, [srchAry, srchAry.length, offset, limit]);

    return result;
};

/**
 * @description 개발 문서 태그 검색 전체 카운트
 * @param {Object} arg { conn, srchAry }
 * @returns {number} cnt
 */
const select2 = async (arg) => {
    const { conn, srchAry } = arg;

    const [[{ cnt }]] = await conn.query(DEV_LINK.select2, [srchAry, srchAry.length]);

    return cnt;
};

/**
 * @description 개발 문서 제목 검색
 * @param {Object} arg { conn, title, offset, limit }
 * @returns {Array}
 */
const select3 = async (arg) => {
    const {
        conn, title, offset, limit
    } = arg;

    const [result] = await conn.execute(DEV_LINK.select3, {
        title: `%${title}%`,
        offset,
        limit
    });

    return result;
};

/**
 * @description 개발 문서 제목 검색 전체 카운트
 * @param {Object} arg { conn, title }
 * @returns {number} cnt
 */
const select4 = async (arg) => {
    const { conn, title } = arg;

    const [[{ cnt }]] = await conn.execute(DEV_LINK.select4, { title: `%${title}%` });

    return cnt;
};

/**
 * @description 인덱스로 개발 문서 1개 로드
 * @param {Object} arg { conn, devLinkIdx }
 * @returns {Object}
 */
const select5 = async (arg) => {
    const { conn, devLinkIdx } = arg;

    const [[result]] = await conn.execute(DEV_LINK.select5, { devLinkIdx });

    return result;
};

/**
 * @description 인덱스에 해당하는 개발 링크 정보 로드
 * @param {Object} arg { conn, devLinkIdxList }
 * @returns {Array}
 */
const select6 = async (arg) => {
    const { conn, devLinkIdxList } = arg;

    const [result] = await conn.query(DEV_LINK.select6, [devLinkIdxList]);

    return result;
};

/**
 * @description 개발 문서 1개 수정
 * @param {Object} arg { conn, devLink }
 */
const update1 = async (arg) => {
    const { conn, devLink } = arg;

    await conn.execute(DEV_LINK.update1, devLink);
};

/**
 * @description 개발 문서 1개 삭제
 * @param {Object} arg { conn, devLinkIdx }
 */
const delete1 = async (arg) => {
    const { conn, devLinkIdx } = arg;

    await conn.execute(DEV_LINK.delete1, { idx: devLinkIdx });
};

module.exports = {
    insert1,
    select1,
    select2,
    select3,
    select4,
    select5,
    select6,
    update1,
    delete1
};
