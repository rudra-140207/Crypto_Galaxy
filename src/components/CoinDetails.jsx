import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {

  const [Coin, setCoin] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [Currency, setCurrency] = useState("inr");

  const currencySymbol = Currency === "inr" ? "₹" : Currency === "eur" ? "€" : "$";

  const Params = useParams();

  useEffect(() => {


    const fetchCoin = async () => {

      try {
        const { data } = await axios.get(`${server}/coins/${Params.id}`);

        console.log(data)
        setCoin(data);
        setLoading(false);

      }


      catch (Error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCoin();

  }, [Params.id])

  if (Error) return <ErrorComponent message={'Error while fecthing coin details'} />

  return (

    <Container maxW={'container.xl'}>
      {
        Loading ? <Loader /> : (

          <>
            





            <RadioGroup value={Currency} onChange={setCurrency} p={'6'}>
              <HStack spacing={'4'}>
                <Radio value='inr' >INR</Radio>
                <Radio value='eur' >EURO</Radio>
                <Radio value='usd'>USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={'4'} p={["2", "16"]} alignItems={'flex-start'}>
              <Text
                alignSelf={'center'}
                fontSize={'small'}
                opacity={'0.8'} >

                Last updated on {Date(Coin.market_data.last_updated).split("G")[0]}

              </Text>

              <Image src={Coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

              <Stat>
                <StatLabel> {Coin.name} </StatLabel>
                <StatNumber>
                  {currencySymbol} {Coin.market_data.current_price[Currency]}
                </StatNumber>

                <StatHelpText>
                  <StatArrow
                    type={Coin.market_data.price_change_percentage_24h > 0 ?
                      "increase" : "decrease"} />

                  {Coin.market_data.price_change_percentage_24h} %

                </StatHelpText>
              </Stat>

              <Badge fontSize={'xl'} >
                {`#${Coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                high={`${currencySymbol} ${Coin.market_data.high_24h[Currency]}`}
                low={`${currencySymbol} ${Coin.market_data.low_24h[Currency]}`} />

              <Box w={'full'} p={'4'} >

                <Item title={'Max Supply'} value={Coin.market_data.max_supply} />

                <Item title={'Circulating Supply'} value={Coin.market_data.circulating_supply} />

                <Item
                  title={'Market Capital'}
                  value={`${currencySymbol} ${Coin.market_data.market_cap[Currency]}`} />

                <Item
                  title={'All Time Low'}
                  value={`${currencySymbol} ${Coin.market_data.atl[Currency]}`} />

                <Item
                  title={'All Time High'}
                  value={`${currencySymbol} ${Coin.market_data.ath[Currency]}`} />

              </Box>

            </VStack>
          </>

        )
      }
    </Container>

  )
}

const CustomBar = ({ high, low }) => (

  <VStack w={'full'}  >
    <Progress value={50} colorScheme={'teal'} w={'full'} />

    <HStack w={'full'} justifyContent={'space-between'}>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'} > 24h Range</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)

const Item = ({ title, value }) => (

  <HStack justifyContent={'space-between'} w={'full'} my={'4'} fontSize={["14", "20"]} >
    <Text letterSpacing={'4'}> {title} </Text>
    <Text> {value} </Text>
  </HStack>

)

export default CoinDetails