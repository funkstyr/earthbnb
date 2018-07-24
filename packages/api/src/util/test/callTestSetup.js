require("ts-node/register");

const { setup } = require("./testSetup");

module.exports = async function() {
  await setup();

  return null;
};
