import { AggregatorAccount, SwitchboardProgram } from '@switchboard-xyz/evm.js';
import { ethers } from 'ethers';
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
  const aggregatorAddress = '0x79296604669C3c907efEB42AA2a7281900F9299c';

  const aggregatorAccount = new AggregatorAccount(
    switchboardProgram,
    aggregatorAddress
  );
  const result = await aggregatorAccount.latestValue();
  console.log(result);
}
main();
