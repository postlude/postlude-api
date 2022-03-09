/**
 * @fileoverview routes/user_router.js
 */

const router = require('express').Router();
const USER_CNTLR = require('@/application/user/cntlr/user_cntlr');

router.route('/sgnn')
    .post(USER_CNTLR.sgnn);

module.exports = router;
