const router = require('express').Router();

const TEST_CNTLR = require('../application/test/test_cntlr');

router.route('/')
    .get(TEST_CNTLR.test);

module.exports = router;