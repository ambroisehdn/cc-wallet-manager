import { Request, Response } from 'express';
import {createWallet as createdWalletService} from '../services/wallet'; 
import  validate  from 'uuid-validate';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { uid, secret } = req.body;

    if (!uid || !validate(uid)) {
      res.status(400).send({ error: 'Please provide a valid UUID' });
    }

    if (!secret) {
      res.status(400).send({ error: 'Secret is missing' });
    }

    if (secret.length !== 32) {
      res.status(400).send({ error: 'Please provide a valide secret ' });
    }
    // console.log(req.body)

    const walletResponse = await createdWalletService(uid, secret);
    console.log(walletResponse)
    let statusCode  = 201
    if(walletResponse.error){
      statusCode = 400
    }
    res.status(statusCode).send(walletResponse);
  } catch (error) {
    res.status(500).send({ error: `Server Error ${error}` });
  }
};


export const getWallet = async (req: Request, res: Response) => {
    try {

      const uid: string = req.query.uid as string; 
      const secret: string = req.query.secret as string; 

      if (!uid || !validate(uid)) {
        res.status(400).json({ error: 'Please provide a valid UUID' });
      }
  
      if (!secret) {
        res.status(400).json({ error: 'Secret is missing' });
      }
      //customIdentifier.length === 32
      if (secret.length !== 32) {
        res.status(400).send({ error: 'Please provide a valide secret ' });
      }

      // const wallet = await createdWalletService(uid, secret);
      res.status(201).send({ address:" wallet.toJSON" });

    } catch (error) {
      res.status(500).send({ error: 'Server Error' });

    }
  };
  