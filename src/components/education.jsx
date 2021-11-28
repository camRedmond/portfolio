import React from 'react';
import { Flex, useColorMode, VStack, Box, Heading, SimpleGrid } from '@chakra-ui/react';

const Education = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div id="education">
            <Flex w={"85vw"} my={"10vh"} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} boxShadow="2xl" rounded="xl" textAlign="center" justifyContent="center">
                <VStack p={"8vmax"}>
                    <Box mb={"40px"}>
                        <Heading size="xl" fontFamily={"Montserrat"} pb={"30px"} >Education</Heading>

                        <Heading size="lg" fontFamily={"Montserrat"} color={colorMode === 'light' ? '#3D168B' : '#F8B800'} >Wilfrid Laurier University</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} color={colorMode === 'light' ? '#F8B800' : 'white'} >Computer Science Major</Heading>
                    </Box>
                    <SimpleGrid columns={[1,2]} spacing={"4vw"}>
                        <Heading size="md" fontFamily={"Montserrat"} >Data Structures I/II</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Algorithm Design/Analysis</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Discrete Structures</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Operating Systems</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Computer Networks</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Applied Cryptography</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Databases I/II</Heading>
                        <Heading size="md" fontFamily={"Montserrat"} >Data Mining</Heading>
                        
                    </SimpleGrid>
                </VStack>
            </Flex>
        </div>
    )
}

export default Education;