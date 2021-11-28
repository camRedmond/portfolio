import React from 'react';
import { Flex, Button, Box, HStack, Link, Center, Text, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box id={"header"} position={"fixed"} zIndex={"200"} bg={'transparent'} backdropFilter={"blur(10px) saturate(180%)"} w={'95vw'} mt={'3vh'} p={'2vw'} boxShadow="2xl" p="6" rounded="md" >
                <Flex>
                    <HStack justifyContent="space-between" w={'100%'}>
                        <Center w={'5vw'} h={'9vh'} ml={"2vw"}>
                            <Text
                                fontSize={["3xl","6xl"]}
                                bgGradient="linear(to-l, #7928CA, #FF0080)"
                                bgClip="text"
                                fontFamily="Montserrat"
                                fontWeight="bold"
                            >
                                CR
                            </Text>
                        </Center>

                        <Center h={"9vh"} p={"2vw"}>
                            <Button bg="transparent" w="2vw" mr="1.5vw" onClick={toggleColorMode}>
                                {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                            </Button>
                        
                            <HStack spacing="1vw">
                                <Link href="./CameronRedmond-Resume2022.pdf" textDecoration="none !important" isExternal>
                                    <Button bg="transparent" h={"6vh"}>
                                        <Text fontSize={[".85em","1.5em"]} fontFamily="Montserrat">Resume</Text>
                                    </Button>
                                </Link>
                                <Link href="mailto:cam.redmond@protonmail.com" textDecoration="none !important" isExternal>
                                    <Button bg="transparent" h={"6vh"}>
                                        <Text fontSize={[".85em","1.5em"]} fontFamily="Montserrat">Contact</Text>
                                    </Button>
                                </Link>
                            </HStack>
                        </Center>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}

export default Header;