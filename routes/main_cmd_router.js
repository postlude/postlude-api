/**
 * @fileoverview routes/main_cmd_router.js
 */

const router = require('express').Router();
const MAIN_CMD_CNTLR = require('@/application/cmd/cntlr/main_cmd_cntlr');

router.route('/')
    .post(MAIN_CMD_CNTLR.addMainCmd)
    .put(MAIN_CMD_CNTLR.modifyCmd);

router.route('/list')
    .get(MAIN_CMD_CNTLR.getCmdList);

router.route('/:idx')
    .get(MAIN_CMD_CNTLR.getCmd);

module.exports = router;
