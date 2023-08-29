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
      return {
        "error":true,
        "message":"Unable to find a wallet belong to your uid"
      }
    }

    console.log(wallet)
    const encryptedWallet = wallet.encryptedWallet;
    // console.log(encryptedWallet)

    const cryptedWallet = JSON.stringify(encryptedWallet);

    let decryptWallet:any ;
  
    await web3.eth.accounts.decrypt(cryptedWallet, secret).then((r)=>{
      // console.log(r)
      decryptWallet = r
    }).catch(
      (r) => {
        //
      }
    )

    if(decryptWallet){
      return  {
        "error":false,
        "message": 'Wallet decrypted ! ',
        "data": {privateKey:decryptWallet.privateKey}
      }
    }else{
      return {
        "error" : true,
        "message" : 'Unable to decrypt your wallet please verify the secret key '
      }
    }
}

