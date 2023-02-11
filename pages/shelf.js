import React from 'react';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import useIsMounted from './hooks/useIsMounted';
import Head from 'next/head';

const Shelf = () => {

    const mounted = useIsMounted();

    const { address, isConnected, isDisconnected } = useAccount();

    const fetchNFT = async () => {
        const res = await fetch(`/api/get-my-books?address=${address}`, {
            "method": "GET",
            }
        )
        const response = await res.json();
        return response.data;
    };
    
    const { isLoading, data } = useQuery(['nfts'], fetchNFT, { enabled: isConnected });

    return (
        <>
        <Head>
            <title>Shelf</title>
            <meta property="og:title" content="Bookverse Shelf" key="title" />
        </Head>
        {mounted && !isConnected ? 
        <div className='flex m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl dark:text-inherit'>
            Please, Sign In to start reading
        </div> :
        <div className='grid grid-cols-2 gap-3 m-2 lg:grid-cols-5'>
            {mounted && isConnected && data && data.nfts.map((nft, id) => {
                return (
                    <div key={id}>
                        <Card name={nft?.metadata?.name} 
                        description={nft?.metadata?.description} 
                        image={nft?.metadata?.image} 
                        external_url={nft?.metadata?.external_url} 
                        tokenId={nft?.token_id} 
                        author={nft?.metadata?.attributes} />
                    </div>
                )
            })}
        </div>
        }
        </>
    )
};

export default Shelf;