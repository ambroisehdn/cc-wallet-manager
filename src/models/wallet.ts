import mongoose, { Document, Model, Schema } from 'mongoose';

interface Wallet {
  uid: string;
  encryptedWallet: object;
}

const walletSchema = new Schema<WalletDocument>({
  uid: String,
  encryptedWallet: Object,
});

interface WalletDocument extends Wallet, Document {}

const WalletModel: Model<WalletDocument> = mongoose.model<WalletDocument>('Wallet', walletSchema);

export {WalletModel,Document}
