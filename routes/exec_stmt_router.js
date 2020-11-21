/**
 * @fileoverview routes/exec_stmt_router.js
 */

const router = require('express').Router();
const EXEC_STMT_CNTLR = require('@/application/exec_stmt/cntlr/exec_stmt_cntlr');

router.route('/')
    .post(EXEC_STMT_CNTLR.addExecStmt);

module.exports = router;
