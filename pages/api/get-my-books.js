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

    const address = req.query.address;
    const chain = process.env.NEXT_PUBLIC_CHAIN;
    const contract = process.env.NEXT_PUBLIC_DROP_CONTRACT;
    
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NFT_PORT_KEY
      }
    };
    
    const response = await fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}&page_size=50&include=metadata&contract_address=${contract}`, options)
    const data = await response.json()
    return res.status(200).json({ data: data })
};