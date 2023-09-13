import { Box, Image, Text, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
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
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
      >
        Crypto Galaxy
      </Text>


      <motion.div
        style={{
          height: "70vh",
          width : "100%"
        }}
      >
        <Image
          p={"4"}
          w={"max-content"}
          h={"full"}
          m={"auto"}
          objectFit={"contain"}
          src={btcSrc}
          animation={animation}
        />
      </motion.div>


    </Box>
  );
};

export default Home;
