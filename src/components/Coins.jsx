import { Container, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from "../index"
import Loader from "./Loader"

const Coins = () => {

  const [Coins , setCoins] = useState([]);
const [Loading , setLoading] =useState(true);

useEffect(()=>{

  const fetchCoins = async()=>{
const {data} = await axios.get(`${server}/coins/markets?vs_currency=inr`);
setCoins(data);
setLoading(false);

  }

  fetchCoins();
},[])

  return (
<Container maxW={'container.xl'}>
    {Loading ? <Loader /> : 
  <>
    
    

      <VStack>

{
  Coins.map((i)=>(
    <div>{i.name}</div>
  ))
}

      </VStack>

    
    </>}
    </Container>
  )
}

export default Coins