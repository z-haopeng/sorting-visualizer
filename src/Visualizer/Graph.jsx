import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import GitHubIcon from '@material-ui/icons/GitHub';

import {getBubbleSortAnimations} from '../Algorithms/BubbleSort';
import {getInsertionSortAnimations} from '../Algorithms/InsertionSort';
import {getMergeSortAnimations} from '../Algorithms/MergeSort';

export const BAR_COLOR = 'rgb(129, 212, 250)';
export const COMPARISON_COLOR = 'rgb(156, 39, 176)';
export const SORTED_COLOR = 'rgb(0, 200, 83)';
const FINAL_PASS_DELAY = 1.5;
const ANIMATIONS_PER_MS = 25;

const BUBBLE_SORT = 0;
const INSERTION_SORT = 1;
const MERGE_SORT = 2;

var timeouts = [];

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            array: [], 
            numRows: 64, 
            algorithm: BUBBLE_SORT,
            isLandscape: window.innerWidth > window.innerHeight,
            sorting: false};
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
                                <Button disabled={this.state.sorting} variant='contained' color='primary' onClick={() => this.resetArray()}>Randomize</Button>
                            </Box>  
                            <Box p={1} display='flex' flexDirection='column'>
                                <InputLabel shrink id='algorithmLabel'>Algorithm</InputLabel>
                                <Select disabled={this.state.sorting} labelId='algorithmLabel' defaultValue={BUBBLE_SORT} onChange={(event) => this.changeAlgorithm(event)}>
                                    <MenuItem value={BUBBLE_SORT}>Bubble Sort</MenuItem>
                                    <MenuItem value={INSERTION_SORT}>Insertion Sort</MenuItem>
                                    <MenuItem value={MERGE_SORT}>Merge Sort</MenuItem>
                                </Select>
                            </Box>
                            {/*Button to initiate sort*/}
                            <Box p={1}>  
                                <Button disabled={this.state.sorting} variant='contained' color='secondary' onClick={() => this.sort()}>Sort!</Button>
                            </Box>  
                        </Box>
                        {/*Slider to control how many numbers to sort*/}
                        <Box mx='auto' m={1} width='512px' maxWidth='75%'>
                            <Typography align='left'>Size of Array</Typography>
                            <Slider disabled={this.state.sorting} min={8} max={256} step={8} defaultValue={64} valueLabelDisplay='auto'
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
                                    className='bar'
                                    position='absolute'
                                    bottom={0}
                                    width='100%'
                                    style={{
                                        height: `${num/10.24}%`,
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
                            <Button disabled={this.state.sorting} variant='contained' color='primary' onClick={() => this.resetArray()}>Randomize</Button>
                        </Box>  
                        {/*Button to initiate sort*/}
                        <Box p={1}>  
                            <Button disabled={this.state.sorting} variant='contained' color='secondary' onClick={() => this.sort()}>Sort!</Button>
                        </Box>     
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <InputLabel shrink id='algorithmLabel'>Algorithm</InputLabel>
                            <Select disabled={this.state.sorting} labelId='algorithmLabel' defaultValue={BUBBLE_SORT} onChange={(event) => this.changeAlgorithm(event)}>
                                <MenuItem value={BUBBLE_SORT}>Bubble Sort</MenuItem>
                                <MenuItem value={INSERTION_SORT}>Insertion Sort</MenuItem>
                                <MenuItem value={MERGE_SORT}>Merge Sort</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    {/*Slider to control how many numbers to sort*/}
                    <Box mx='auto' m={1} width='512px' maxWidth='75%'>
                        <Typography align='left'>Size of Array</Typography>
                        <Slider disabled={this.state.sorting} min={8} max={256} step={8} defaultValue={64} valueLabelDisplay='auto'
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
                                className='bar'
                                position='absolute'
                                bottom={0}
                                width='100%'
                                style={{
                                    height: `${num/10.24}%`,
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

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = e => {
        if(this.state.isLandscape !== (window.innerWidth > window.innerHeight)) {
            this.setState({numRows: 64, algorithm: BUBBLE_SORT, sorting: false});
            for(let i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i]);
            }
            timeouts = [];
            this.resetArray();
        }
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
        let arrayOfBars = document.getElementsByClassName('bar');
        for(let i = 0; i < arrayOfBars.length; i++)
            arrayOfBars[i].style.backgroundColor = BAR_COLOR;
    }

    sort() {
        // Enter sorting state
        this.setState({sorting: true});
        // Make sure all bars start off neutral colored
        let arrayOfBars = document.getElementsByClassName('bar');
        for(let i = 0; i < arrayOfBars.length; i++)
            arrayOfBars[i].style.backgroundColor = BAR_COLOR;
        switch(this.state.algorithm) {
            default:
                console.log("Oopsy doopsy that hasn't been implemented yet");
                this.setState({sorting: false});
                break;
            case BUBBLE_SORT:
                let bubbleAnimations = getBubbleSortAnimations(this.state.array);
                this.animateWithSwap(bubbleAnimations, arrayOfBars, 0.3, 1.8);
                break;
            case INSERTION_SORT:
                let insertionAnimations = getInsertionSortAnimations(this.state.array);
                this.animateWithSwap(insertionAnimations, arrayOfBars, 1, 1.5);
                break;
            case MERGE_SORT:
                let mergeAnimations = getMergeSortAnimations(this.state.array);
                this.animateWithMerge(mergeAnimations, arrayOfBars, 2, 1);
                break;
        }
    }

    // Animations with format [number, number, boolean]
    // Use for algorithms that compare and swap in-place
    // Bubble sort, Insertion sort, etc.
    animateWithSwap(animations, arrayOfBars, delay, exponent) {
        let powerFactor = Math.pow(256/this.state.numRows, exponent);
        let scaleFactor = 256/this.state.numRows;
        let processingTime = animations.length/ANIMATIONS_PER_MS;

        for(let i = 0; i < animations.length; i++) {
            // Indices of bars to process and whether to toggle color or swap
            let [barOneIdx, barTwoIdx, toggleColor] = animations[i];
            // Schedule color changes and swaps in order
            // Delay duration scales with power function
            // Essentially, a higher exponent slows smaller arrays down more
            // If exponent is 2 and efficiency is O(n^2), all size arrays will take the same time to sort
            // An exponent of 0 won't slow down smaller arrays at all
            // Max size (256) arrays are unaffected by exponent
            if(toggleColor) {
                timeouts.push(setTimeout(() => {
                    let newColor = arrayOfBars[barOneIdx].style.backgroundColor === COMPARISON_COLOR ? BAR_COLOR : COMPARISON_COLOR;
                    arrayOfBars[barOneIdx].style.backgroundColor = newColor;
                    arrayOfBars[barTwoIdx].style.backgroundColor = newColor;
                }, i * delay * powerFactor + processingTime));
            } else {
                timeouts.push(setTimeout(() => {
                    let temp = arrayOfBars[barOneIdx].style.height;
                    arrayOfBars[barOneIdx].style.height = arrayOfBars[barTwoIdx].style.height;
                    arrayOfBars[barTwoIdx].style.height = temp;
                }, i * delay * powerFactor + processingTime));
            }
        }
        // Sweeping animation to turn all bars green after all swaps completed
        // Uses a direct proportion instead of power function so the screen is filled at a constant speed
        for(let i = 0; i < arrayOfBars.length; i++) {
            timeouts.push(setTimeout(() => {
                arrayOfBars[i].style.backgroundColor = SORTED_COLOR;
            }, (i*FINAL_PASS_DELAY*scaleFactor) + (animations.length*delay*powerFactor) + processingTime));
        }
        // Re-enable buttons and update state array to match the sorted one after everything is complete
        // Slightly cheating by using built-in sorting algorithm, but whatever we already did the important part
        timeouts.push(setTimeout(() => {
            this.state.array.sort((a, b) => a - b);
            this.setState({sorting: false});
            timeouts = [];
        }, (arrayOfBars.length*FINAL_PASS_DELAY*scaleFactor) + (animations.length*delay*powerFactor) + processingTime));
    }

    animateWithMerge(animations, arrayOfBars, delay, exponent) {
        let processingTime = animations.length/ANIMATIONS_PER_MS;
        let scaleFactor = 256/this.state.numRows;
        let timeFactor = Math.pow(scaleFactor * Math.log(256) / Math.log(this.state.numRows), exponent);

        for(let i = 0; i < animations.length; i++) {
            let [index, changes, toggleColor] = animations[i];

            if(toggleColor) {
                timeouts.push(setTimeout(() => {
                    arrayOfBars[index].style.backgroundColor = changes;
                }, i*timeFactor*delay + processingTime));
            } else {
                timeouts.push(setTimeout(() => {
                    arrayOfBars[index].style.height = `${changes*100/1024}%`;
                }, i*timeFactor*delay + processingTime));
            }
            /*
            if(i % 3 === 0) {
                timeouts.push(setTimeout(() => {
                    let [barOneIdx, barTwoIdx] = animations[i];
                    arrayOfBars[barOneIdx].style.backgroundColor = COMPARISON_COLOR;
                    arrayOfBars[barTwoIdx].style.backgroundColor = COMPARISON_COLOR;
                }, i*timeFactor*delay + processingTime));
            } else if(i % 3 === 1) {
                timeouts.push(setTimeout(() => {
                    let [barOneIdx, barTwoIdx] = animations[i];
                    arrayOfBars[barOneIdx].style.backgroundColor = BAR_COLOR;
                    arrayOfBars[barTwoIdx].style.backgroundColor = BAR_COLOR;
                }, i*timeFactor*delay + processingTime));
            } else {
                timeouts.push(setTimeout(() => {
                    let [barIdx, newHeight] = animations[i];
                    arrayOfBars[barIdx].style.height = `${newHeight/10.24}%`;
                }, i*timeFactor*delay + processingTime));
            }*/
        }

        // Final sweep of green over sorted array
        for(let i = 0; i < arrayOfBars.length; i++) {
            timeouts.push(setTimeout(() => {
                arrayOfBars[i].style.backgroundColor = SORTED_COLOR;
            }, i*FINAL_PASS_DELAY*scaleFactor + animations.length*delay*timeFactor + processingTime));
        }
        // Re-enable buttons
        timeouts.push(setTimeout(() => {
            this.state.array.sort((a, b) => a - b);
            this.setState({sorting: false});
            timeouts = [];
        }, arrayOfBars.length*FINAL_PASS_DELAY*scaleFactor + animations.length*delay*timeFactor + processingTime));
    }
}

function randomIntOnInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}