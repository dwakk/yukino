const fs = require("fs");


const admin = [];
cmd = fs
  .readdirSync("./slashCommands/info")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/info/${file}`);
  admin.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const adminfr = [];
cmd = fs
  .readdirSync("./slashCommands/info")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/info/${file}`);
  adminfr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


const fun = [];
cmd = fs
  .readdirSync("./slashCommands/fun")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/fun/${file}`);
  fun.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const funfr = [];
cmd = fs
  .readdirSync("./slashCommands/fun")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/fun/${file}`);
  funfr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


const info = [];
cmd = fs
  .readdirSync("./slashCommands/info")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/info/${file}`);
  info.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const infofr = [];
cmd = fs
  .readdirSync("./slashCommands/info")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/info/${file}`);
  infofr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


const moderation = [];
cmd = fs
  .readdirSync("./slashCommands/moderation")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/moderation/${file}`);
  moderation.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const moderationfr = [];
cmd = fs
  .readdirSync("./slashCommands/moderation")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/moderation/${file}`);
  moderationfr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


const utility = [];
cmd = fs
  .readdirSync("./slashCommands/utility")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/utility/${file}`);
  utility.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const utilityfr = [];
cmd = fs
  .readdirSync("./slashCommands/utility")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/utility/${file}`);
  utilityfr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


const support = [];
cmd = fs
  .readdirSync("./slashCommands/support")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/support/${file}`);
  support.push({
    name: slashCmd.name,
    description: slashCmd.description,
  });
}

const supportfr = [];
cmd = fs
  .readdirSync("./slashCommands/support")
  .filter((file) => file.endsWith(".js"));
for (const file of cmd) {
  const slashCmd = require(`../slashCommands/support/${file}`);
  supportfr.push({
    name: slashCmd.name,
    description: slashCmd.fr,
  });
}


exports.admin = admin;
exports.adminfr = adminfr;
exports.fun = fun;
exports.funfr = funfr;
exports.info = info;
exports.infofr = infofr;
exports.moderation = moderation;
exports.moderationfr = moderationfr;
exports.utility= utility;
exports.utilityfr = utilityfr;
exports.support = support;
exports.supportfr = supportfr;