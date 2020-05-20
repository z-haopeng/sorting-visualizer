import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import './Graph.css'


const BAR_COLOR = 'turquoise';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [], numRows: 64};
    }
    
    render() {
        return( 
            <div>
                {/*Button to re-randomize numbers*/}
                <Button variant='contained' color='primary' onClick={() => this.resetArray()}>Generate New Numbers</Button>
                {/*Slider to control how many numbers to sort*/}
                <Slider className='numberSlider' min={8} max={256} step={8} defaultValue={this.state.numRows}
                onChangeCommitted={ (e, val) => {
                    this.setState({numRows: val});
                    this.resetArray();
                }}></Slider>
                <Box className="barContainer">
                    {this.state.array.map((num, index) => (
                        <Box className='graphBar' 
                            width={1/this.state.numRows} 
                            height={num/1000}
                            key={index} 
                            style={{
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
            array.push(randomIntOnInterval(50, 1000));
        this.setState({array})
    }
}

function randomIntOnInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}