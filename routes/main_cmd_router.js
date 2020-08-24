/**
 * @fileoverview routes/main_cmd_router.js
 */

const router = require('express').Router();
const MAIN_CMD_CNTLR = require('@/application/cmd/cntlr/main_cmd_cntlr');

router.route('/')
    .post(MAIN_CMD_CNTLR.addMainCmd)
    .put(MAIN_CMD_CNTLR.modifyMainCmd);

router.route('/list')
    .get(MAIN_CMD_CNTLR.getMainCmdList);

router.route('/:idx')
    .get(MAIN_CMD_CNTLR.getMainCmd);

module.exports = router;
