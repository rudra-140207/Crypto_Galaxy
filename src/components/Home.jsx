import { Image, Text, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/blockchain-3041480_1920-modified.png";
import { motion } from "framer-motion";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Home = () => {

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (

    <div  >
      <>

        <Text
          fontSize={"6xl"}
          textAlign={"center"}
          fontFamily={"cursive"}
          color={"gray.600"}
        >
          Crypto Galaxy
        </Text>
        <Text
          fontSize={"18"}
          textAlign={"center"}
          fontFamily={"cursive"}
          color={"gray.400"}
          w={"60%"}
          m={"auto"}
        >
          Track Crypto Prices, Exchanges, and Trends in One Place
        </Text>


        <motion.div
          style={{
            height: "70vh"
          }}
        >
          <Image
            p={"4"}
            w={"55%"}
            h={"55%"}
            m={"auto"}
            objectFit={"contain"}
            src={btcSrc}
            animation={animation}
          />
          <Text w={["80%", "50%"]} m={"auto"} color={"grey"} fontSize={["17", "17", "20"]} fontFamily={"cursive"} >
            Welcome to our Crypto Galaxy, where you can stay informed about the latest developments in the world of digital assets. Explore real-time exchange data, monitor coin prices, and delve into price change graphs, all in one convenient place.
          </Text>
        </motion.div>

      </>
    </div>

  );
};

export default Home;
