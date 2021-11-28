import React, { Component } from 'react';
import { VStack } from '@chakra-ui/react';
import Header from './header';
import Terminal from './terminal';
import Skills from './skills';
import Education from './education';
import Footer from './footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData: {}
        };
    }

    getPersonalData() {
        fetch('./personalData.json')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ personalData: data });
            })
    }

    componentDidMount() {
        this.getPersonalData();

        window.addEventListener('scroll', this.scrollHandle);
    }

    scrollHandle() {
        // console.log('scroll:',window.pageYOffset);

        let x = document.getElementById('header');
        
        if (window.pageYOffset > 300) {
            x.style['opacity'] = '0';
            x.style['transition'] = 'opacity 300ms ease-in';
        }else {
            x.style['opacity'] = '1';
            x.style['transition'] = 'opacity 600ms ease-in';
        }
        if (window.pageYOffset > 0) {
            x.style['margin-top'] = '0';
        }else {
            x.style['margin-top'] = '3vh';
        }
    }

    render() {
        return (
            <>
                <VStack spacing={"10vh"}>
                    <Header />
                    <Terminal />
                    <Skills />
                    <Education />
                    <Footer />
                </VStack>
            </>
        );
    }
}


export default App;