/**
 * @fileoverview config/cstm_err.js
 */

module.exports = class CstmErr extends Error {
    constructor(errMsg, errRspns, errObj) {
        super(errMsg);
        this.errMsg = errMsg;
        this.errRspns = errRspns;
        this.errObj = errObj;
    }

    /**
     * @description 콘솔에 출력할 로그
     */
    get msg() {
        return this.errMsg;
    }

    /**
     * @description response로 반환할 리턴 코드 및 데이터
     */
    get rspns() {
        return {
            ...this.errRspns,
            ...this.errObj
        };
    }
};
