import React from 'react';
import { Flex, VStack, Heading, ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div id="footer">
            <Flex w={"80vw"} my={"10vh"} justifyContent={"center"} >
                <VStack>
                    <ButtonGroup variant="ghost" color="gray.600">
                        <IconButton as="a" href="www.linkedin.com/in/cameron-redmond" target="_blank" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
                        <IconButton as="a" href="https://github.com/camRedmond" target="_blank" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
                        <IconButton as="a" href="https://twitter.com/camreds" aria-label="Twitter" target="_blank" icon={<FaTwitter fontSize="20px" />} />
                    </ButtonGroup>

                    <Heading size="xs">
                        CAM REDMOND &copy;
                    </Heading>
                </VStack>
            </Flex>
        </div>
    )
}

export default Footer;