// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors';
import initMiddleware from '../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async function handler(req, res) {

  // Run cors
  await cors(req, res)

  const listingId = req.query.listingId;
  const img = req.query.img;
  const name = req.query.name;
  const address = req.query.address;
  
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.PAPER_KEY
    },
    body: JSON.stringify({
      walletAddress: `${address}`,
      sendEmailOnCreation: false,
      requireVerifiedEmail: false,
      metadata: {},
      expiresInMinutes: 12,
      usePaperKey: false,
      hideNativeMint: false,
      hidePaperWallet: true,
      hideExternalWallet: false,
      hidePayWithCard: false,
      hideApplePayGooglePay: false,
      hidePayWithCrypto: true,
      hidePayWithIdeal: true,
      limitPerTransaction: 20,
      redirectAfterPayment: true,
      sendEmailOnTransferSucceeded: true,
      feeBearer: "SELLER",
      contractId: process.env.PAPER_CONTRACT_ID,
      title: `${name}`,
      contractArgs: {tokenId: `${listingId}`},
      imageUrl: `${img}`,
      description: 'Please, choose the quantity',
      successCallbackUrl: 'https://bookverse.vercel.app/shelf',
      cancelCallbackUrl: `https://bookverse.vercel.app/${listingId}`,
      postPurchaseMessageMarkdown: "[![twitter](https://bookverse.s3.eu-west-3.amazonaws.com/2021+Twitter+logo+-+blue.png =30x30)](https://twitter.com/bookversexyz)",
      postPurchaseButtonText: "Go to Shelf",
    })
  };
  const response = await fetch('https://paper.xyz/api/2022-08-12/checkout-link-intent', options)
  const data = await response.json()
  return res.status(200).json({ data: data })
};
