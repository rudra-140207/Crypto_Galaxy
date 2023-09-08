import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import Chart from "./Charts";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";

const CoinDetails = () => {
  const params = useParams();
  const [Coin, setCoin] = useState({});
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [Currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    Currency === "inr" ? "₹" : Currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${Currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, Currency, days]);

  if (Error) return <ErrorComponent message={'Error while fecthing coin details'} />

  return (

    <Container maxW={'container.xl'}>
      {
        Loading ? <Loader /> : (

          <>
            <Box width={"full"} borderWidth={1}>
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p="4" overflowX={"auto"}>
              {btns.map((i) => (
                <Button
                  disabled={days === i}
                  key={i}
                  onClick={() => switchChartStats(i)}
                >
                  {i}
                </Button>
              ))}
            </HStack>
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