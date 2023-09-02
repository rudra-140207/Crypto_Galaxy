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

      } catch (Error) {

        setError(true);
        setLoading(false);

      }
    }

    fetchExchange();

  }, []);

  if (Error) return <ErrorComponent message={"Error while fetching data"} />

  return (

    <Container maxW={"container.xl"}>

      {Loading ? <Loader /> :
        <>
          <Heading m={'8'} border={'2px'} textAlign={'center'} >Exchanges</Heading>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>

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

    <VStack
      w={'40'}
      h={'40'}
      p={"6"}
      borderRadius={'50'}
      shadow={'lg'}
      transition={'all 0.3s'}
      m={'4'}
      bgColor={"#8b849994"}
      color={"black"}
      css={{
        "&:hover": {
          transform: "scale(1.1)"
        }
      }} >

      <Image
        src={imgSrc}
        w={'14'}
        h={'14'}
        objectFit={'conatin'}
        alt='Exchange' />

      <Heading noOfLines={'1'} size={'md'}>{rank}</Heading>

      <Text noOfLines={"1"}>{name}</Text>

    </VStack>

  </a>

)

export default Exchange
