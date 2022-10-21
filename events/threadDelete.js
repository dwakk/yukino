const client = require('..');

client.on("threadDelete", (t) => {
    t.leave()
});