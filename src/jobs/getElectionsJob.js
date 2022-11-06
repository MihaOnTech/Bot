const cron = require('node-cron')
const api = require('../utils/api');
const { Logger } = require('../utils/logger');
const logger = Logger.getInstance();
const db = require('../../models');
  

function scheduler (param) {
    cron.schedule('*/1 * * * *', () => {
    try {
        console.log("JOB START") 
        console.log(param);       
    } catch (error) {
        logger.error(`JOB ERROR ${error}`);
    }
    });
    console.log(`Scheduler 2 activated: ${new Date()}`);
}

function doStuff (p) {
    const msg = `Running task with params "${p}" in doStuff. The time is: ${new Date()}`;
    console.log(msg);
};

module.exports = { scheduler };