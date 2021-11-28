// theme.js
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = {
  styles: {
    global: (props) => ({
      body: {
        background: props.colorMode === 'light' ? "white" : "#212121",
      },
      img: {
          height: ["100px","180px"],
          width: 'auto',
          margin: 'auto 0',
      
          objectFit: 'contain',
      },
    }),
    ...config,
  },
};

const customTheme = extendTheme(theme);

export default customTheme;