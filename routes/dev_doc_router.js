/**
 * @fileoverview routes/dev_doc_router.js
 */

const router = require('express').Router();
const DEV_DOC_CNTLR = require('@/application/dev_doc/cntlr/dev_doc_cntlr');

router.route('/')
    .post(DEV_DOC_CNTLR.addDoc);

module.exports = router;
