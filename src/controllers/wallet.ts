import { Request, Response } from 'express';
import {createWallet as createdWalletService, getWallet as getWalletService} from '../services/wallet'; 
import  validate  from 'uuid-validate';
import { returnResponse } from '../helpers/error.message';

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { uid, secret } = req.body;

    if (!uid || !validate(uid)) {
      res.status(400).send(returnResponse('Please provide a valid UUID',true));
      return res;
    }

    if (!secret) {
      res.status(400).send(returnResponse('Secret is missing',true));
      return res;
    }

    if (secret.length !== 32) {
      res.status(400).send(returnResponse('Please provide a valide secret ',true));
      return res
    }
    // console.log(req.body)

    const walletResponse = await createdWalletService(uid, secret);
    console.log(walletResponse)
    let statusCode  = 201
    if(walletResponse.error){
      statusCode = 400
    }
    res.status(statusCode).send(walletResponse);
    return res;
  } catch (error) {
    res.status(500).send(returnResponse(`Server Error ${error}`,true));
    return res;
  }
};


export const getWallet = async (req: Request, res: Response) => {
    try {

      const uid: string = req.query.uid as string; 
      const secret: string = req.query.secret as string; 

      if (!uid || !validate(uid)) {
        res.status(400).send(returnResponse('Please provide a valid UUID',true));
        return res
      }
  
      if (!secret) {
        res.status(400).send(returnResponse('Secret is missing',true ));
        return res

      }

      if (secret.length !== 32) {
        res.status(400).send(returnResponse('Please provide a valide secret ',true));
        return res

      }

      let statusCode  = 201

      const walletDecript = await getWalletService(uid, secret);
      // console.log(walletDecript)
      if (walletDecript){
        if(walletDecript.error){
          statusCode = 400
        }
      }else{
        statusCode = 400
      }
      res.status(statusCode).send(walletDecript);
      return res


    } catch (error) {
      res.status(500).send(returnResponse(`Server Error ${error}`,true));
      return res

    }
  };
  