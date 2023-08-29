import Web3 from 'web3';
import {WalletModel, Document } from '../models/wallet';

const ethereumNodeUrl = 'http://localhost:8545';

const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

export const createWallet = async (uid: string, secret: string) => {

  const walletExist = await WalletModel.findOne({ uid });
  if(walletExist){
    return {
      "error":true,
      "message":"You already have a wallet !"
    }
  }
  console.log(walletExist)
  const wallet = web3.eth.accounts.create();
  // console.log(wallet.privateKey)
  web3.eth.accounts.encrypt(wallet.privateKey, secret).then(
    async (ethWallet) => {
      // console.log(ethWallet)
      await WalletModel.create({ uid, encryptedWallet :ethWallet })
    }
  );
  return {
    "error":false,
    "message":"Your wallet is successfuly cretead",
    "data" : {address :wallet.address}
  };
};

export const getWallet = async (uid: string, secret: string) => {


  const wallet = await WalletModel.findOne({ uid });

    if (!wallet) {
      return null
    }else{
      // const encryptedWallet = wallet.encryptedWallet;
      // const decryptedWallet = web3.eth.accounts.decrypt(encryptedWallet, secret);
      // return decryptedWallet;
      return wallet;

    }
}

