/**
 * @fileoverview application/tag/svc/tag_svc.js
 */

const { RSPNS, TAG_TY } = require('@/config/dfn');
const { syncAryPrll } = require('@/helper/async');
const TAG = require('../exec/tag');

/**
 * @description 태그 저장(syncAryPrll 로직 함수)
 * @param {string} tag
 * @param {Object} arg { conn, tagIdxAry }
 */
const saveTag = async (tag, arg) => {
    const { conn, tagIdxAry } = arg;

    if (tag) {
        const tagIdx = await TAG.insert1({ conn, tag });
        tagIdxAry.push(tagIdx);
    }
};

/**
 * @description 태그 배열 저장
 * @param {Object} arg { conn, tagAry }
 * @returns {Array} tagIdxAry
 */
exports.saveTagAry = async (arg) => {
    const { conn, tagAry } = arg;

    const tagIdxAry = [];
    await syncAryPrll(tagAry, saveTag, { conn, tagIdxAry });

    return tagIdxAry;
};

/**
 * @description 태그 타입에 따른 모든 태그 리스트 로드
 * @param {Object} arg { conn, tagTy }
 * @returns {Array} tagList
 */
exports.getTagList = async (arg) => {
    const { conn, tagTy } = arg;

    if (tagTy === TAG_TY.LINK) {
        const tagList = await TAG.select1({ conn });
        return tagList;
    } else {
        throw new CstmErr('INVALID TAG TY', RSPNS.FAIL_INVLD_FIELD);
    }
};
