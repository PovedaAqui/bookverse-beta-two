import { useClaimConditions, useContract } from '@thirdweb-dev/react';

//Custom hook to clain NFT

const usePrice = (id) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_DROP_CONTRACT);
  const { data } = useClaimConditions(contract, id);
  return data;
}

export default usePrice;