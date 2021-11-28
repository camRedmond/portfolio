import React from 'react';
import { Flex, Button, Box, Stack, VStack, HStack, Link, Center, Text, Circle, useColorMode } from '@chakra-ui/react';
import Typed from 'react-typed';
import 'react-typed/dist/animatedCursor.css';

const Terminal = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const userSys = (colorMode === 'light' ? 'camreds@macbook-air ~ ' : 'camreds/root:~$ ');

    var breakLine = "<br>`"+ (colorMode === 'light' ? 'camreds@macbook-air ~ ' : 'camreds/root:~$ ') +"`"
    var newLine = "<br>"

    var strings = "stats cam.redmond" + newLine;
    strings += newLine + "^1300Hi, my name is Cameron Redmond and I am a new graduate looking to break into the industry";

    return (
        <>
            <Flex pt={"15vh"}>
                <Box w={"85vw"} h={"60vh"} bg={colorMode === 'light' ? 'gray.100' : "rgb(94, 39, 80)"} boxShadow="2xl" rounded="md">

                    {/* Terminal Bar */}
                    <Box id="terminal-bar" w={"100%"} h="4vh" bg={"#333333"} roundedTopLeft={"md"} roundedTopRight={"md"}>
                        <Center h={"100%"} justifyContent="space-between">
                            <Box w={"40px"}>
                            </Box>
                            <Box>
                                <Text fontSize={"lg"} fontFamily={"Montserrat"} color={'white'}>
                                    Cameron Redmond:~
                                </Text>
                            </Box>
                            <HStack p={'10px'}>
                                <Link>
                                    <Circle bg={colorMode === 'light' ? "yellow.500" : "gray.500"} size={'12px'} />
                                </Link>
                                <Link>
                                    <Circle bg={colorMode === 'light' ? "green.500" : "gray.500"} size={'12px'} />
                                </Link>
                                <Link>
                                    <Circle bg={colorMode === 'light' ? "red.500" : "#E95420"} size={'12px'} />
                                </Link>
                            </HStack>
                        </Center>
                    </Box>

                    {/* Terminal Prompt */}
                    <Box p={"10px"} color={colorMode === 'light' ? 'black' : 'white'} overflowWrap={"break-word"} fontSize={"xl"} fontFamily={colorMode === 'light' ? "Montserrat" : "Ubuntu Mono"}>
                        <div className="typed" id='typed'>
                            {userSys}
                            <Typed
                                strings={[strings]}
                                typeSpeed={40}
                                startDelay={2000}
                                showCursor={true}
                            />
                        </div>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default Terminal;