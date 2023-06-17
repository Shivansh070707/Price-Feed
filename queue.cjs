const { OracleQueueAccount } = require('@switchboard-xyz/evm.js');
const { SwitchboardProgram } = require('@switchboard-xyz/evm.js');

const { ethers } = require('ethers');
async function main() {
  const privateKey =
    'e12bef9be5153e4f3fc18377b9b333209b7d80e1d7e62ffef5018bcd1ffa4e3c';
  const provider = new ethers.providers.JsonRpcProvider(
    'https://arb-goerli.g.alchemy.com/v2/lqP6TyPZYe19IC6pH2Fd_pbnplKauEIJ'
  );
  const signer = new ethers.Wallet(privateKey, provider);

  const switchboardProgram = await SwitchboardProgram.load(
    signer, // Signer instance
    '0x2802f459D1515257b73fAaa6dD9512E7cDE04592' // Switchboard contract address
  );

  const [oracleQueueAccount, tx] = await OracleQueueAccount.create(
    switchboardProgram,
    {
      authority: '0x068aeB7f11fb0d5e27BbbDfD07a63B59D0448Da8',
      name: 'my queue',
      oracleTimeout: 3600,
      reward: 10000000,
      unpermissionedFeedsEnabled: true,
      maxSize: 100,
    }
  );
  console.log('hii');
  console.log('o', oracleQueueAccount);
  console.log('tx', tx);
  const oracleQueue = await oracleQueueAccount.loadData();
  console.log('oq', oracleQueue);
  const oracleQueueAccount1 = new OracleQueueAccount(
    switchboardProgram,
    oracleQueueAccount.address
  );

  const oracleAccount = await oracleQueueAccount1.createOracle(
    {
      name: 'my oracle',
      authority: '0x068aeB7f11fb0d5e27BbbDfD07a63B59D0448Da8',
    },
    // enable the heartbeat permissions (requires msg.sender to be queueAuthority)
    true,
    // you can also explicitly provide the queueAuthority signer
    {
      signer: signer,
    }
  );
  console.log('oa', oracleAccount);

  const oracle = await oracleAccount.loadData();

  const xyz = await oracleAccount.heartbeat();
  console.log('x', xyz);
}
main();
