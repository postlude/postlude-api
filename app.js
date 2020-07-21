require('module-alias/register');

const express = require('express');

const app = express();
const port = 3000;

app.use('/test', require('@/routes/test_router'));

const server = app.listen(port, () => {
    console.log('==================== [MyCmd WAS] ====================');
    console.log(`Server listening on port ${port}`);
});
