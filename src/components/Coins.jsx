import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from "../index"
import Loader from "./Loader"
import ErrorComponent from './ErrorComponent'
import { Link } from 'react-router-dom'

const Coins = () => {

  const [Coins, setCoins] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [Page, setPage] = useState(1);
  const [Currency, setCurrency] = useState("inr");


  const currencySymbol = Currency === "inr" ? "₹" : Currency === "eur" ? "€" : "$";

  const changePage = (Page) => {
    setPage(Page);
    setLoading(true);
  }

  const btns = new Array(100).fill(1);

  useEffect(() => {


    const fetchCoins = async () => {

      try {
        const { data } =
          await axios.get(`${server}/coins/markets?vs_currency=${Currency}&page=${Page}`);

        setCoins(data);
        setLoading(false);

      }


      catch (Error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCoins();

  }, [Currency, Page])

  if (Error) return <ErrorComponent message={"Error while fetching coins"} />

  return (
    <Container maxW={'container.xl'}>
      {Loading ? <Loader /> :
        <>
          <Heading m={'8'} border={'2px'} textAlign={'center'} >Coins</Heading>

          <RadioGroup value={Currency} onChange={setCurrency} p={'6'}>
            <HStack spacing={'4'}>
              <Radio value='inr' >INR</Radio>
              <Radio value='eur' >EURO</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>

            {
              Coins.map((i) => (
                <CoinCard
                  name={i.name}
                  symbol={i.symbol}
                  id={i.id}
                  imgSrc={i.image}
                  price={i.current_price}
                  currencySymbol={currencySymbol} />
              ))
            }

          </HStack>

          <HStack overflowX={'auto'} p={'8'} w={'full'} >
            {
              btns.map((items, index) => (
                <Button
                  key={index}
                  color={'white'}
                  variant={'link'}

                  onClick={(Page) => {
                    changePage(index + 1)
                  }} >

                  {index + 1}

                </Button>
              ))
            }
          </HStack>

        </>}
    </Container>
  )
}

const CoinCard = ({ name, imgSrc, id, symbol, price, currencySymbol = '₹' }) => (


  <Link to={`/coins/${id}`}>
    <VStack
      w={'40'}
      h={'40'}
      p={"4"}
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
      }}>

      <Image
        src={imgSrc}
        w={'10'}
        h={'10'}
        objectFit={'conatin'}
        alt='Exchange'
      />

      <Heading noOfLines={'1'} size={'md'}>{name} </Heading>

      <Text noOfLines={'1'} >{symbol} </Text>

      <Text >
        {price ? `${currencySymbol} ${price}` : "NA"}
      </Text>

    </VStack>
  </Link>


)

export default Coins