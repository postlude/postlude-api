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

/**
 * @description 개발 문서 삭제
 * @param {Object} arg { conn, devDocIdx }
 */
exports.rmDoc = async (arg) => {
    const { conn, devDocIdx } = arg;

    await DEV_DOC_TAG_LNK.delete1({ conn, devDocIdx });

    await DEV_DOC.delete1({ conn, devDocIdx });
};

/**
 * @description 개발 문서 수정
 * @param {Object} arg { conn, devDoc, tagAry }
 */
exports.modifyDoc = async (arg) => {
    const { conn, devDoc, tagAry } = arg;

    // [STEP 1] 개발 문서 수정
    await DEV_DOC.update1({ conn, devDoc });

    // [STEP 2] 기존 태그 연결 삭제
    const { idx: devDocIdx } = devDoc;
    await DEV_DOC_TAG_LNK.delete1({ conn, devDocIdx });

    // [STEP 3] 신규 태그 배열 저장
    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    // [STEP 4] 신규 태그 연결 저장
    await bulkSaveTagLnk({ conn, devDocIdx, tagIdxAry });
};
