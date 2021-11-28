import React from 'react';
import { Flex, Box, VStack, Heading, SimpleGrid, useColorMode } from '@chakra-ui/react';

const Skills = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div id="skills">
            <Flex w={"85vw"} mt={"10vh"} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} boxShadow="2xl" rounded="xl" textAlign="center" justifyContent="center">
                <VStack>
                    <Box p={"8vmax"}>
                        <Heading mb={"5vh"} fontFamily={"Montserrat"}>Tech Stack</Heading>
                        <SimpleGrid columns={[1,3]} spacing={"4vw"}>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/python.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/javascript.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/java.png'} />
                            </Box>


                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/react.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/node-js.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/php.png'} />
                            </Box>


                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/postgresql.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/mongo.png'} />
                            </Box>
                            <Box w={["100px","180px"]} h={["100px","180px"]}>
                                <img src={process.env.PUBLIC_URL + '/images/git.png'} />
                            </Box>
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Flex>
        </div>
    )
}

export default Skills;