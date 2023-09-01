import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'} >
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