module.exports = {
    apps: [{
        name: 'mycmd-was',
        script: './app.js',
        watch: true,
        ignore_watch: ['.git', 'logs', 'node_modules'],
        // env: {
        //     "NODE_ENV": "development",
        // },
        // env_production : {
        //     "NODE_ENV": "production"
        // },
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        out_file: './logs/pm2_out.log',
        error_file: './logs/pm2_err.log'
    }],
    // deploy: {
    //     production: {
    //         user: 'SSH_USERNAME',
    //         host: 'SSH_HOSTMACHINE',
    //         ref: 'origin/master',
    //         repo: 'GIT_REPOSITORY',
    //         path: 'DESTINATION_PATH',
    //         'pre-deploy-local': '',
    //         'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    //         'pre-setup': ''
    //     }
    // }
};
