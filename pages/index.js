import { useContract, useNFTs } from '@thirdweb-dev/react';
import Card2 from '../components/Card2';
import useIsMounted from './hooks/useIsMounted';

export default function Store() {

  const mounted = useIsMounted();
  const { contract } = useContract(process.env.NEXT_PUBLIC_DROP_CONTRACT);
  const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 100 });

  return (
    <>
      {mounted && isLoading ? 
      <h1>
        Loading...
      </h1> : 
      <div className='grid grid-cols-2 gap-3 m-2 lg:grid-cols-5'>
        {mounted && nfts && nfts.map((nfts, id) => {
          return (
            <div key={id}>
              <Card2 name={nfts.metadata.name}
              author={nfts.metadata.attributes} 
              description={nfts.metadata.description} 
              image={nfts.metadata.image} 
              listingId={nfts.metadata.id}/>
            </div>
          )
        })}
      </div>
      }
    </>
  )
}
