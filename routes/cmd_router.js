/**
 * @fileoverview routes/cmd_router.js
 */

const router = require('express').Router();
const CMD_CNTLR = require('@/application/cmd/cmd_cntlr');

router.route('/')
    .post(CMD_CNTLR.addCmd)
    .put(CMD_CNTLR.modifyCmd);

module.exports = router;
