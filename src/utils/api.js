const { Logger } = require('../utils/logger');
const logger = Logger.getInstance();
const { Wallet } = require('ethers');
const { VocdoniSDKClient, EnvOptions, PlainCensus, Election, Vote } = require('@vocdoni/sdk');
const db = require('../utils/db');

async function vocdoniConnect() {
    // Wallet
    console.log('Connecting to Vocdoni...');
    /// use .env for mnemonic
    const mnemonic = "banana leaf quote number phrase hockey coconut wisdom lunch siege merit dinner";
    const signer = Wallet.fromMnemonic(mnemonic);

    const client = new VocdoniSDKClient({
        env: EnvOptions.DEV, // mandatory, can be 'dev' or 'prod'
        wallet: signer, // optional, the signer used (Metamask, Walletconnect)
    });

    // Organization Account
    const info = await client.createAccount();
    if (info.balance === 0) {
        await client.collectFaucetTokens()
    }

    return client;
};

async function voterConnect( electionId, userTag, password, respuesta) {
    // get signer = decrypedWallet
    const encryptedSigner = await db.getUserSigner(userTag);
    const signer = await Wallet.fromEncryptedJson(JSON.stringify(encryptedSigner), password);
    console.log(signer);

    const client = new VocdoniSDKClient({
        env: EnvOptions.DEV, // mandatory, can be 'dev' or 'prod'
        wallet: signer, // optional, the signer used (Metamask, Walletconnect)
    });

    client.setElectionId(electionId)

    const vote = new Vote([respuesta - 1]);

    console.log(vote);
    const voteId = await client.submitVote(vote)
    console.log(voteId);

    return voteId;
}

async function createRandomWallet(password) {
    const wallet = Wallet.createRandom();
    const encrypted = await wallet.encrypt(password);
    return encrypted;
}
async function createCensus() {
    var censedAddresses = await db.listCensus();
    const census = new PlainCensus()
    census.add(censedAddresses[0]);
    for (let i=0; i<censedAddresses.size; i++){
        census.add(censedAddresses[i]);
    }

    return census
    
}
async function createElection(number, questionText, choice1, choice2, choice3, dateTime, census) {
    const dates = dateTime.split(" - ");
    //const startDate = dates[0];
    const startDate = '2024-01-22 00:00:00';
    const endDate = '2023-02-23 23:23:23';

    const question = {
        "choices": [
            {
                "title": { "default" : choice1 },
                "value": 0
            },
            {
                "title": { "default" : choice2 },
                "value": 1
            },
            {
                "title": { "default" : choice3 },
                "value": 2
            }
        ],
        "description": { "default" : "quest description" },
        "title": {"default": questionText}
    }

    const questions = [question];
    console.log("CREATE ELECTION")
    const election = Election.from({
        title: 'Test_Tribu election ' + number,
        description: 'Election description',
        // a header image for your process (this is for example purposes; avoid using random sources)
        header: 'https://source.unsplash.com/random/2048x600',
        endDate: new Date(endDate),
        census,
        questions: questions
    });
    console.log(election);
    return election;
}


module.exports = { vocdoniConnect, createCensus, createRandomWallet, createElection, voterConnect }
