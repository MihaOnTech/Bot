const fs = require("fs");

const votarCh = fs.readFile("./src/config.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      const channels = JSON.parse(jsonString);
      console.log("Channels:", channels.votar);
      console.log("Channel Id:", channels["votar"]);

      return channels["votar"];

    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

module.exports = {
  votarCh: votarCh
}
