import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from './components/app';
import theme from "./styles/theme";

import './styles/index.scss';
import customTheme from './styles/theme';


ReactDOM.render(
    <ChakraProvider theme={customTheme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </ChakraProvider>,
    document.getElementById('root')
);