import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import './Graph.css'


const BAR_COLOR = '#81d4fa';

const BUBBLE_SORT = 0;
const INSERTION_SORT = 1;
const MERGE_SORT = 2;

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
                    <Box mx='auto' justifyContent='center'>
                        <InputLabel id='algorithmLabel'>Algorithm</InputLabel>
                        <Select
                            labelId='algorithmLabel'
                            defaultValue={BUBBLE_SORT}
                        >
                            <MenuItem value={BUBBLE_SORT}>Bubble Sort</MenuItem>
                            <MenuItem value={INSERTION_SORT}>Insertion Sort</MenuItem>
                            <MenuItem value={MERGE_SORT}>Merge Sort</MenuItem>
                        </Select>
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