import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <HStack p={["2","5"]} m shadow={'base'} bgColor={'blackAlpha.400'} >
            <Button variant={'ghost'} colorScheme='purple' >
                <Link to={'/'} >Home</Link>
            </Button>
            <Button variant={'ghost'} colorScheme='purple'>
                <Link to={'/Coins'} >Coins</Link>
            </Button>
            <Button variant={'ghost'} colorScheme='purple'>
                <Link to={'/exchange'} >Exchanges</Link>
            </Button>
        </HStack>

    )
}

export default Header