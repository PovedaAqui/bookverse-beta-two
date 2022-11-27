// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    const address = req.query.address;
    const chain = process.env.NEXT_PUBLIC_CHAIN;
    const contract = process.env.NEXT_PUBLIC_DROP_CONTRACT;
  
    fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&include=metadata&contract_address=${contract}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.NFT_PORT_KEY
      },
    })
    .then(response => response.json())
    .then(data => res.status(200).json({ data: data}))
    .catch(err => console.error(err));
  };