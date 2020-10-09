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
exports.mdfyDoc = async (arg) => {
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

/**
 * @description 개발 문서 검색
 * @param {Object} arg { conn, numPage, ty, srchWord }
 * @returns {Object} { totCnt, devDocList }
 */
exports.getDocList = async (arg) => {
    const {
        conn, numPage, ty, srchWord
    } = arg;

    const limit = 10;
    const offset = (numPage - 1) * 10;

    if (ty === '1') { // 태그 검색
        const tag = srchWord;
        const totCnt = await DEV_DOC.select2({ conn, tag });

        if (totCnt) {
            const devDocList = await DEV_DOC.select1({
                conn, tag, offset, limit
            });
            return { totCnt, devDocList };
        } else {
            return { totCnt };
        }
    } else { // 제목 검색
        const title = srchWord;
        const totCnt = await DEV_DOC.select4({ conn, title });

        if (totCnt) {
            const devDocList = await DEV_DOC.select3({
                conn, title, offset, limit
            });
            return { totCnt, devDocList };
        } else {
            return { totCnt };
        }
    }
};

/**
 * @description 인덱스로 개발문서 1개 로드
 * @param {Object} arg { conn, devDocIdx }
 * @returns {Object} { devDoc, tagAry }
 */
exports.getDocByIdx = async (arg) => {
    const { conn, devDocIdx } = arg;

    const devDocAry = await DEV_DOC.select5({ conn, devDocIdx });

    const [{ idx, title, url }] = devDocAry;

    const tagAry = [];
    devDocAry.forEach(({ tag }) => {
        tagAry.push(tag);
    });

    return {
        devDoc: { idx, title, url },
        tagAry
    };
};
