import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import GitHubIcon from '@material-ui/icons/GitHub';

const BAR_COLOR = '#81d4fa';

const BUBBLE_SORT = 0;
const INSERTION_SORT = 1;
const MERGE_SORT = 2;

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            array: [], 
            numRows: 64, 
            algorithm: BUBBLE_SORT,
            isLandscape: window.innerWidth > window.innerHeight};
    }
    
    render() {
        if(this.state.isLandscape)
            return(
                <div>
                    <Box mt={1} display='flex' flexDirection='column' mx='auto'>
                        <Box display='flex' justifyContent='center'>
                            <Button variant='outlined' startIcon={<GitHubIcon />} href='https://github.com/z-haopeng/sorting-visualizer'>View On GitHub</Button>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='flex-end'>
                            {/*Button to re-randomize numbers*/}
                            <Box p={1}>
                                <Button variant='contained' color='primary' onClick={() => this.resetArray()}>Randomize Set</Button>
                            </Box>  
                            <Box p={1} display='flex' flexDirection='column'>
                                <InputLabel shrink id='algorithmLabel'>Algorithm</InputLabel>
                                <Select labelId='algorithmLabel' defaultValue={BUBBLE_SORT} onChange={(event) => this.changeAlgorithm(event)}>
                                    <MenuItem value={BUBBLE_SORT}>Bubble Sort</MenuItem>
                                    <MenuItem value={INSERTION_SORT}>Insertion Sort</MenuItem>
                                    <MenuItem value={MERGE_SORT}>Merge Sort</MenuItem>
                                </Select>
                            </Box>
                            {/*Button to initiate sort*/}
                            <Box p={1}>  
                                <Button variant='contained' color='secondary'>Sort!</Button>
                            </Box>  
                        </Box>
                        {/*Slider to control how many numbers to sort*/}
                        <Box mx='auto' m={1} width='512px' maxWidth='75%'>
                            <Typography align='left'>Size of Set</Typography>
                            <Slider min={8} max={256} step={8} defaultValue={64} valueLabelDisplay='auto'
                            onChangeCommitted={ (e, val) => {
                                this.setState({numRows: val});
                                this.resetArray();
                            }}></Slider>
                        </Box>
                    </Box>
                    <Box mx='auto' height='50vh' width='1024px' maxWidth='100%'>
                        {this.state.array.map((num, index) => (
                            <Box 
                            display='inline-block'
                            width={1/this.state.numRows} 
                            key={index}
                            height='100%'
                            position='relative'
                            >
                                <Box
                                    position='absolute'
                                    bottom={0}
                                    height={num/1024}
                                    width='100%'
                                    style={{

                                        backgroundColor: BAR_COLOR
                                }}></Box>
                            </Box>
                        ))}
                    </Box>
                </div>
            );

        return( 
            <div>
                <Box mt={1} display='flex' flexDirection='column' mx='auto'>
                    <Box display='flex' justifyContent='center'>
                        <Button variant='outlined' startIcon={<GitHubIcon />} href='https://github.com/z-haopeng/sorting-visualizer'>View On GitHub</Button>
                    </Box>
                    <Box display='flex' justifyContent='center'> 
                        {/*Button to re-randomize numbers*/}
                        <Box p={1}>
                            <Button variant='contained' color='primary' onClick={() => this.resetArray()}>Randomize Set</Button>
                        </Box>  
                        {/*Button to initiate sort*/}
                        <Box p={1}>  
                            <Button variant='contained' color='secondary'>Sort!</Button>
                        </Box>     
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <InputLabel shrink id='algorithmLabel'>Algorithm</InputLabel>
                            <Select labelId='algorithmLabel' defaultValue={BUBBLE_SORT} onChange={(event) => this.changeAlgorithm(event)}>
                                <MenuItem value={BUBBLE_SORT}>Bubble Sort</MenuItem>
                                <MenuItem value={INSERTION_SORT}>Insertion Sort</MenuItem>
                                <MenuItem value={MERGE_SORT}>Merge Sort</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    {/*Slider to control how many numbers to sort*/}
                    <Box mx='auto' m={1} width='512px' maxWidth='75%'>
                        <Typography align='left'>Size of Set</Typography>
                        <Slider min={8} max={256} step={8} defaultValue={64} valueLabelDisplay='auto'
                        onChangeCommitted={ (e, val) => {
                            this.setState({numRows: val});
                            this.resetArray();
                        }}></Slider>
                    </Box>
                </Box>             
                <Box mx='auto' height='50vh' width='1024px' maxWidth='100%'>
                    {this.state.array.map((num, index) => (
                        <Box 
                        display='inline-block'
                        width={1/this.state.numRows} 
                        key={index}
                        height='100%'
                        position='relative'
                        >
                            <Box
                                position='absolute'
                                bottom={0}
                                height={num/1024}
                                width='100%'
                                style={{
                                    backgroundColor: BAR_COLOR
                            }}></Box>
                        </Box>
                    ))}
                </Box>
            </div>
        );
    }

    componentDidMount() {
        this.resetArray();
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = e => {
        this.setState({isLandscape: window.innerWidth > window.innerHeight});
    }

    changeAlgorithm(event) {
        this.setState({algorithm: event.target.value});
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