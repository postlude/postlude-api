/**
 * @fileoverview application/dev_doc/svc/dev_doc_svc.js
 */

const TAG_SVC = require('@/application/tag/svc/tag_svc');
const DEV_DOC = require('../exec/dev_doc');
const DEV_DOC_TAG_LNK = require('../exec/dev_doc_tag_lnk');

/**
 * @description 태그 연결 BULK INSERT
 * @param {Object} arg { conn, devDocIdx, tagIdxAry }
 */
const bulkSaveTagLnk = async (arg) => {
    const { conn, devDocIdx, tagIdxAry } = arg;

    const row = [];
    tagIdxAry.forEach((tagIdx) => {
        row.push([devDocIdx, tagIdx]);
    });

    await DEV_DOC_TAG_LNK.insert1({ conn, row });
};

/**
 * @description 개발 문서 저장
 * @param {Object} arg { conn, devDoc, tagAry }
 */
exports.addDoc = async (arg) => {
    const { conn, devDoc, tagAry } = arg;

    const devDocIdx = await DEV_DOC.insert1({ conn, devDoc });

    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    await bulkSaveTagLnk({ conn, devDocIdx, tagIdxAry });
};
