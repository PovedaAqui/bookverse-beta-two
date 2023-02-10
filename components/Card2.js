import React from 'react';
import { useState, useEffect } from 'react';
import usePrice from '../pages/hooks/Price';
import Image from 'next/image';
import useIsMounted from '../pages/hooks/useIsMounted';
import { useRouter } from 'next/router';

const Card2 =  ({image, listingId, author, name, description, ...props}) => {

    const mounted = useIsMounted();
    const router = useRouter();
    const [price, setPrice] = useState(null);
    const [pair, setPair] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
          let url = "";
          if (image) {
            try {
                const response = await fetch("https://nftstorage.link/");
                url = response.ok
                ? image.replace("ipfs//", "https://nftstorage.link/ipfs/")
                : "";
            } catch (error) {
              console.error(error);
              url = image.replace("ipfs//", "https://ipfs.io/ipfs/");
            }
          }
          setUrl(url);
        };
        fetchUrl();
    }, [image]);      

    const priceData = usePrice(listingId); // get the price of the listing from the contract

    useEffect(() => {
        const getPrice = () => {
            if (priceData) {
                setPrice(priceData.map(data => data.currencyMetadata.displayValue));
                const maxqty = priceData.map(data => data.maxClaimableSupply); // get the max quantity of the listing
                const qty = priceData.map(data2 => data2.currentMintSupply) // get the current quantity of the listing
                setPair(`${qty}/${maxqty}`); // set the pair of the listing
            }
        }
        getPrice();
    }, [priceData])

    return (
        <div className="relative w-full sm:max-w-full rounded-lg overflow-hidden shadow-md sm:shadow-lg">
            <a className="cursor-pointer" onClick={()=> router.push(`listing/${listingId}`)}>
                {url ? (<Image className="rounded-t-lg object-cover w-full h-48 sm:h-72" src={url} alt="cover" width={450} height={450} priority={true}/>) 
                : (<div className="h-48 sm:h-64 bg-gray-200 flex items-center justify-center animate-pulse">Loading...</div>)}
                <div className="px-4 py-2 sm:py-4">
                    <div className="font-bold text-sm sm:text-lg mb-0 text-inherit">{name? name : <div>Title...</div>}</div>
                    <div className="font-semibold text-inherit text-sm mb-1 sm:text-lg tracking-wide">{author? author[0]?.value : <div>Author...</div>}</div>
                    <div className="text-inherit text-sm mb-2 line-clamp-3">{description}</div>
                    <div className="block items-center">
                        <h6 className="text-inherit text-sm font-medium mb-1">Price</h6>
                    </div>
                    <div className='flex items-center'>
                        <svg data-name="86977684-12db-4850-8f30-233a7c267d11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                            <path d="M10 20c5.542 0 10 -4.458 10 -10S15.542 0 10 0 0 4.458 0 10s4.458 10 10 10z" fill="#2775ca"/><path d="M12.75 11.583c0 -1.458 -0.875 -1.958 -2.625 -2.167 -1.25 -0.167 -1.5 -0.5 -1.5 -1.083s0.417 -0.958 1.25 -0.958c0.75 0 1.167 0.25 1.375 0.875 0.042 0.125 0.167 0.208 0.292 0.208h0.667c0.167 0 0.292 -0.125 0.292 -0.291v-0.042c-0.167 -0.917 -0.917 -1.625 -1.875 -1.708v-1c0 -0.167 -0.125 -0.292 -0.333 -0.333h-0.625c-0.167 0 -0.292 0.125 -0.333 0.333v0.958c-1.25 0.167 -2.041 1 -2.041 2.042 0 1.375 0.833 1.917 2.583 2.125 1.167 0.208 1.542 0.458 1.542 1.125s-0.583 1.125 -1.375 1.125c-1.083 0 -1.459 -0.459 -1.583 -1.083 -0.041 -0.167 -0.167 -0.25 -0.291 -0.25h-0.709c-0.167 0 -0.291 0.125 -0.291 0.292v0.042c0.167 1.041 0.833 1.791 2.208 2v1c0 0.167 0.125 0.291 0.333 0.333h0.625c0.167 0 0.292 -0.125 0.333 -0.333v-1c1.25 -0.209 2.083 -1.083 2.083 -2.209z" fill="#fff"/>
                            <path d="M7.875 15.958c-3.25 -1.167 -4.917 -4.791 -3.708 -8 0.625 -1.75 2 -3.083 3.708 -3.708 0.167 -0.083 0.25 -0.208 0.25 -0.417V3.25c0 -0.167 -0.083 -0.292 -0.25 -0.333 -0.042 0 -0.125 0 -0.167 0.041 -3.958 1.25 -6.125 5.459 -4.875 9.417 0.75 2.333 2.542 4.125 4.875 4.875 0.167 0.083 0.333 0 0.375 -0.167 0.042 -0.041 0.042 -0.083 0.042 -0.167v-0.583c0 -0.125 -0.125 -0.291 -0.25 -0.375zM12.292 2.958c-0.167 -0.083 -0.333 0 -0.375 0.167 -0.042 0.042 -0.042 0.083 -0.042 0.167v0.583c0 0.167 0.125 0.333 0.25 0.417 3.25 1.167 4.917 4.791 3.708 8 -0.625 1.75 -2 3.083 -3.708 3.708 -0.167 0.083 -0.25 0.208 -0.25 0.417V17c0 0.167 0.083 0.292 0.25 0.333 0.042 0 0.125 0 0.167 -0.041 3.958 -1.25 6.125 -5.459 4.875 -9.417 -0.75 -2.375 -2.583 -4.167 -4.875 -4.917z" fill="#fff"/>
                        </svg>
                        <span className="text-sm sm:text-lg font-semibold text-inherit mt-0 ml-1">{price === undefined || price === null? "..." : price}</span>
                        <span className="text-xs sm:text-sm font-semibold text-inherit mt-0 ml-auto">{pair === undefined || price === null? "..." : pair}</span>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card2;