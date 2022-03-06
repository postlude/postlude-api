/**
 * @fileoverview routes/tag_router.js
 */

const router = require('express').Router();
const TAG_CNTLR = require('@/application/tag/cntlr/tag_cntlr');

router.route('/list')
    .get(TAG_CNTLR.getTagList);

module.exports = router;
