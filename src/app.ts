import express from 'express';
import walletRouter from './routers/router';
import {json} from 'body-parser';

import mongoose,{ ConnectOptions }  from 'mongoose';

const app = express();
// app.use(json)
const PORT = process.env.PORT || 8081;

// // Connect to MongoDB
// const dbOptions: ConnectOptions = {
//     useNewUrlParser: true,
//     // Add other options as needed
// };

mongoose.connect('mongodb://root:rootpassword@localhost:27018/cc_wallet_db?authSource=admin');

app.use(express.json());

app.use(walletRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
