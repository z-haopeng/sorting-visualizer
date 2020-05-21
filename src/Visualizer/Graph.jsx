import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer'

import './Graph.css'


const BAR_COLOR = '#81d4fa';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [], numRows: 64, drawerOpen: false};
    }
    
    render() {
        return( 
            <div>
                <Box display='flex' flexDirection='column' mx='auto' maxWidth='99%'>
                    <Box mt={1} display='flex' justifyContent='center'> 
                        {/*Button to re-randomize numbers*/}
                        <Box p={1}>
                            <Button variant='contained' color='primary' onClick={() => this.resetArray()}>Randomize Set</Button>
                        </Box>  
                        {/*Button to initiate sort*/}
                        <Box p={1}>  
                            <Button variant='contained' color='secondary'>Sort!</Button>
                        </Box>     
                    </Box>
                    <Box justifyContent='center'>
                        <Button onClick={(event) => this.toggleDrawer(event, true)}>Choose Algorithm</Button>
                        <Drawer open={this.state.drawerOpen} onClose={(event) => this.toggleDrawer(event, false)}>
                            <Box width={250} display='flex' flexDirection='column'
                            onClick={(event) => this.toggleDrawer(event, false)} 
                            onKeyDown={(event) => this.toggleDrawer(event, false)}>
                                <Button>Bubble Sort</Button>
                                <Button>Insertion Sort</Button>
                                <Button>Merge Sort</Button>
                            </Box>
                        </Drawer>
                    </Box>
                    {/*Slider to control how many numbers to sort*/}
                    <Box className='numberSlider' mx='auto' m={1}>
                        <Typography align='left'>Size of Set</Typography>
                        <Slider min={8} max={256} step={8} defaultValue={64} valueLabelDisplay='auto' marks
                        onChangeCommitted={ (e, val) => {
                            this.setState({numRows: val});
                            this.resetArray();
                        }}></Slider>
                    </Box>
                </Box>             
                <Box className="barContainer" mx='auto'>
                    {this.state.array.map((num, index) => (
                        <Box
                            display='inline-block'
                            width={1/this.state.numRows} 
                            height={num/1024}
                            key={index} 
                            style={{
                                verticalAlign: 'top',
                                backgroundColor: BAR_COLOR
                        }}></Box>
                    ))}
                </Box>
            </div>
        );
    }

    componentDidMount() {
        this.resetArray();
    }

    toggleDrawer(event, open) {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({drawerOpen: open});
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < this.state.numRows; i++)
            array.push(randomIntOnInterval(64, 1024));
        this.setState({array})
    }
}

function randomIntOnInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}