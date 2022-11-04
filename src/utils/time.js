function sleep(ms) {
    console.log(`Sleeping for ${ms/1000} seconds`)
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep: sleep
};

