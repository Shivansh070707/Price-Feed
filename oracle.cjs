const { ethers } = require('ethers');
const { OracleQueueAccount } = require('@switchboard-xyz/evm.js');
const { SwitchboardProgram } = require('@switchboard-xyz/evm.js');
async function main() {
  // Instantiate SwitchboardProgram
  const signer = new ethers.Wallet(
    'e12bef9be5153e4f3fc18377b9b333209b7d80e1d7e62ffef5018bcd1ffa4e3c'
  );
  const switchboardProgram = await SwitchboardProgram.load(
    signer, // Signer instance
    '0x73d6C66874e570f058834cAA666b2c352F1C792D' // Switchboard contract address
  );
  const oracleQueueAccount = new OracleQueueAccount(
    switchboardProgram,
    queueAddress
  );

  const oracleAccount = await oracleQueueAccount.createOracle(
    {
      name: 'my oracle',
      authority: '0xMyOracleAuthority',
    },
    // enable the heartbeat permissions (requires msg.sender to be queueAuthority)
    true,
    // you can also explicitly provide the queueAuthority signer
    {
      signer: queueAuthoritySigner,
    }
  );
  const oracle = await oracleAccount.loadData();

  await oracleAccount.heartbeat();
}
main();
