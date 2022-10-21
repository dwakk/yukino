const client = require('..');

client.on("threadCreate", async thread => {
    thread.join()
});