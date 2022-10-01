const client = require('..');

client.on("threadCreate", (t) => {
    t.join()
});