const { readFile, readFileSync, writeFile } = require('fs');

const censusPath = './src/data/census.json';

async function checkCensus (userTag) {
    // Get Census
    const census = await getCensus();

    // Check if User is censed.
    var isCensed = false;
    if(census[userTag]){
        isCensed = true;
    }
    return isCensed;
} 

async function listCensus(){
    // Get Census
    const census = await getCensus();

    // List addresses 
    var addresses = [];
    for (let x in census) {
        addresses.push('0x' + census[x].address);
    }
    
    return addresses;
}

async function addCensus (userTag, encrypted){
    // GET Census
    const census = await getCensus();

    // UPDATE Census
    census[userTag] = encrypted;
    var newCensus = JSON.stringify(census);
    writeFile(censusPath, newCensus, err => {
        if(err) throw err;

        console.log("new User added to Census!");
    })

    return;

}

async function getUserSigner(userTag){
    const census = await getCensus();
    const encryptedSigner = census[userTag];
    return encryptedSigner;
}

async function getCensus(){
    const censusData = readFileSync(censusPath, (error, data) => {
        if(error) {
            console.log("ERROR" + error);
            return;
        }
        return data;
    });

    const census = JSON.parse(censusData);
    return census;
}

module.exports = { checkCensus, addCensus, listCensus, getUserSigner };