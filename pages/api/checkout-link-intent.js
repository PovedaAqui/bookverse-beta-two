// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  const listingId = req.query.listingId;
  const img = req.query.img;

  fetch('https://paper.xyz/api/2022-08-12/checkout-link-intent', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.PAPER_KEY
    },
    body: JSON.stringify({
      sendEmailOnCreation: false,
      requireVerifiedEmail: true,
      metadata: {},
      expiresInMinutes: 12,
      usePaperKey: false,
      hideNativeMint: false,
      hidePaperWallet: false,
      hideExternalWallet: false,
      hidePayWithCard: false,
      hideApplePayGooglePay: false,
      hidePayWithCrypto: true,
      hidePayWithIdeal: true,
      limitPerTransaction: 10,
      redirectAfterPayment: true,
      sendEmailOnTransferSucceeded: true,
      contractId: 'fbdbf966-3231-48e7-bbee-3eb2a1eafa09',
      title: 'Digital Collectible Book',
      contractArgs: {tokenId: `${listingId}`},
      imageUrl: `${img}`,
      description: 'Please, choose the quantity',
      successCallbackUrl: 'https://bookverse.vercel.app/'
    })
  })
  .then(response => response.json())
  .then(data => res.status(200).json({ data: data}))
  .catch(err => console.error(err));
};
