/**
 * @fileoverview application/dev_link/svc/dev_link_svc.js
 */

const TAG_SVC = require('@/application/tag/svc/tag_svc');
const DEV_LINK = require('../exec/dev_link');
const DEV_LINK_TAG = require('../exec/dev_link_tag');

/**
 * @description 태그 연결 BULK INSERT
 * @param {Object} arg { conn, devLinkIdx, tagIdxAry }
 */
const bulkSaveTagLink = async (arg) => {
    const { conn, devLinkIdx, tagIdxAry } = arg;

    const row = [];
    tagIdxAry.forEach((tagIdx) => {
        row.push([devLinkIdx, tagIdx]);
    });

    await DEV_LINK_TAG.insert1({ conn, row });
};

/**
 * @description 개발 문서 저장
 * @param {Object} arg { conn, devLink, tagAry }
 */
const addLink = async (arg) => {
    const { conn, devLink, tagAry } = arg;

    const devLinkIdx = await DEV_LINK.insert1({ conn, devLink });

    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    await bulkSaveTagLink({ conn, devLinkIdx, tagIdxAry });
};

/**
 * @description 개발 문서 삭제
 * @param {Object} arg { conn, devLinkIdx }
 */
const rmLink = async (arg) => {
    const { conn, devLinkIdx } = arg;

    await DEV_LINK_TAG.delete1({ conn, devLinkIdx });

    await DEV_LINK.delete1({ conn, devLinkIdx });
};

/**
 * @description 개발 문서 수정
 * @param {Object} arg { conn, devLink, tagAry }
 */
const mdfyLink = async (arg) => {
    const { conn, devLink, tagAry } = arg;

    // [STEP 1] 개발 문서 수정
    await DEV_LINK.update1({ conn, devLink });

    // [STEP 2] 기존 태그 연결 삭제
    const { idx: devLinkIdx } = devLink;
    await DEV_LINK_TAG.delete1({ conn, devLinkIdx });

    // [STEP 3] 신규 태그 배열 저장
    const tagIdxAry = await TAG_SVC.saveTagAry({ conn, tagAry });

    // [STEP 4] 신규 태그 연결 저장
    await bulkSaveTagLink({ conn, devLinkIdx, tagIdxAry });
};

/**
 * @description 개발 링크 검색
 * @param {Object} arg { conn, numPage, ty, srchTitle, srchAry }
 * @returns {Object} { totCnt, devLinkList }
 */
const getLinkList = async (arg) => {
    const {
        conn, numPage, ty, srchTitle, srchAry
    } = arg;

    const limit = 10;
    const offset = (numPage - 1) * 10;

    if (ty === '1') { // 태그 검색
        // 링크 카운트
        const totCnt = await DEV_LINK.select2({ conn, srchAry });

        if (totCnt) {
            // 태그 배열에 속한 태그를 모두 가지고 있는 링크 인덱스
            const idxList = await DEV_LINK.select1({
                conn, srchAry, offset, limit
            });
            const devLinkIdxList = idxList.map(({ idx }) => idx);

            // 인덱스 배열에 해당하는 제목, url 로드
            const devLinkList = await DEV_LINK.select6({ conn, devLinkIdxList });

            return { totCnt, devLinkList };
        } else {
            return { totCnt };
        }
    } else { // 제목 검색
        const totCnt = await DEV_LINK.select4({ conn, title: srchTitle });

        if (totCnt) {
            const devLinkList = await DEV_LINK.select3({
                conn, title: srchTitle, offset, limit
            });
            return { totCnt, devLinkList };
        } else {
            return { totCnt };
        }
    }
};

/**
 * @description 인덱스로 개발문서 1개 로드
 * @param {Object} arg { conn, devLinkIdx }
 * @returns {Object} { devLink, tagAry }
 */
const getLinkByIdx = async (arg) => {
    const { conn, devLinkIdx } = arg;

    const { tagAry, ...devLink } = await DEV_LINK.select5({ conn, devLinkIdx });

    return {
        devLink,
        tagAry: JSON.parse(tagAry)
    };
};

module.exports = {
    addLink,
    rmLink,
    mdfyLink,
    getLinkList,
    getLinkByIdx
};
