/**
 * @fileoverview helper/async.js
 */

const async = require('async');

/**
 * @description 배열의 각 값에 func 함수를 실행시키고 모든 배열 값에 대해 동작이 끝날 때까지 기다림.
 * 배열 element 순서와 상관없이 병렬적으로 동작.
 * @param {Array} ary 동기적으로 실행시킬 배열
 * @param {Function} func 배열의 각 element에 동작시킬 함수
 * @param {Object} arg 추가적으로 전달할 파라미터
 */
const syncAryPrll = async (ary, func, arg) => {
    try {
        if (Array.isArray(ary)) {
            await async.eachOf(ary, async (elem, idx) => {
                await func(elem, arg, idx, ary);
            });
        } else {
            throw new Error('[async] syncAryPrll - NOT ARRAY');
        }
    } catch (err) {
        console.error('[async] syncAryPrll - ERROR');
        throw err;
    }
};

/**
 * @description 배열의 각 값에 func 함수를 실행시키고 모든 배열 값에 대해 동작이 끝날 때까지 기다림.
 * 배열 순서에 따라 동작하며, 앞 element에 대한 func 동작이 끝나야 다음 element에 대한 func 실행이 시작됨.
 * @param {Array} ary 동기적으로 실행시킬 배열
 * @param {Function} func 배열의 각 element에 동작시킬 함수
 * @param {Object} arg 추가적으로 전달할 파라미터
 */
const syncAryOrdr = async (ary, func, arg) => {
    try {
        if (Array.isArray(ary)) {
            await async.eachOfSeries(ary, async (elem, idx) => {
                await func(elem, arg, idx, ary);
            });
        } else {
            throw new Error('[async] syncAryOrdr - NOT ARRAY');
        }
    } catch (err) {
        console.error('[async] syncAryOrdr - ERROR');
        throw err;
    }
};

module.exports = {
    syncAryPrll,
    syncAryOrdr
};
