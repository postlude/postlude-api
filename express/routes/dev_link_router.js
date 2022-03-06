/**
 * @fileoverview routes/dev_link_router.js
 */

const router = require('express').Router();
const DEV_LINK_CNTLR = require('@/application/dev_link/cntlr/dev_link_cntlr');

router.route('/')
    .post(DEV_LINK_CNTLR.addLink)
    .put(DEV_LINK_CNTLR.mdfyLink);

router.route('/list')
    .get(DEV_LINK_CNTLR.getLinkList);

router.route('/:idx')
    .get(DEV_LINK_CNTLR.getLink)
    .delete(DEV_LINK_CNTLR.rmLink);

module.exports = router;
