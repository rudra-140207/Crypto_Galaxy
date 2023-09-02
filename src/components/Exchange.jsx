import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from "../index"
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader'
import Error from './ErrorComponent'
import ErrorComponent from './ErrorComponent';

const Exchange = () => {

  const [Exchange, setExchange] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);


  useEffect(() => {

    const fetchExchange = async () => {

      try {

        const { data } = await axios.get(`${server}/exchanges`);

        setExchange(data);
        setLoading(false);

      } catch (error) {

        setError(true);
        setLoading(false);

      }
    }

    fetchExchange();

  }, []);

  if(Error) return <ErrorComponent message={"Error while fetching data"}/>

  return (

    <Container maxW={"container.xl"}>

      {Loading ? <Loader /> :
        <>
          <HStack wrap={'wrap'}>

            {
              Exchange.map((i) => (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  imgSrc={i.image}
                  rank={i.trust_score_rank}
                  url={i.url} />
              ))
            }

          </HStack>
        </>}
    </Container>

  )
}


const ExchangeCard = ({ id, name, imgSrc, rank, url }) => (

  <a href={url} target='blank'>

    <VStack w={'52'} p={"8"} borderRadius={'lg'} shadow={'lg'} transition={'all 0.3s'} m={'4'} bgColor={"beige"} color={"black"} css={{
      "&:hover": {
        transform: "scale(1.1)"
      }
    }} >

      <Image
        src={imgSrc}
        w={'10'}
        h={'10'}
        objectFit={'conatin'}
        alt='Exchange' />

      <Heading noOfLines={'1'} size={'md'}>{rank}</Heading>

      <Text noOfLines={"1"}>{name}</Text>

    </VStack>

  </a>

)

export default Exchange
