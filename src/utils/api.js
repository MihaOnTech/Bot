const axios = require('axios');
const { Logger } = require('../utils/logger');
const logger = Logger.getInstance();


async function getElections() {
    const response = await axios.get('https://vocdoni-go-api.herokuapp.com/elections')
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            //console.log(res.data);
            logger.http(`|HTTP| GET Elctions | ${res.status} | ${headerDate}`)
            return res.data;
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });

   return response;
}

async function createElection(number, question, choice1, choice2, choice3, dateTime) {
    const dates = dateTime.split(" - ");
    const startDate = dates[0];
    const endDate = dates[1];

    const newElection = {
        "Title": `Test_Tribu election ${number}`,
        "StartDate": startDate,
        "EndDate": endDate,
        "Question": question,
        "Choice1": choice1,
        "Choice2": choice2,
        "Choice3": choice3,
        "Status": "ACTIVE"
    };
    
    const response = await axios.post('https://vocdoni-go-api.herokuapp.com/elections', newElection)
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            logger.http(`|HTTP| GET Elctions | ${res.status} | ${headerDate}`)
            return res.data;
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });

    return response;
}

module.exports = { getElections, createElection }
