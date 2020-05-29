import {BAR_COLOR, COMPARISON_COLOR} from '../Visualizer/Graph'

export function getBubbleSortArray(array) {
    let result = array.slice(0);
    for(let i = 0; i < result.length-1; i++) {
        for(let j = 0; j < result.length-i-1; j++) {
            if(result[j] > result[j+1]) {
                swap(result, j, j+1);
            }    
        }
    }
    return result;
}

export function getBubbleSortAnimations(array) {
    let animations = [];
    let temp = array.slice(0);
    for(let i = 0; i < temp.length-1; i++) {
        for(let j = 0; j < temp.length-i-1; j++) {
            // Blocks of information with three parts: 
            // Two indices to consider and whether to change color or swap
            // true: toggle colors, false: swap heights
            animations.push([[j, j+1], [COMPARISON_COLOR, COMPARISON_COLOR], true]);
            if(temp[j] > temp[j+1]) {
                animations.push([[j, j+1], [temp[j+1], temp[j]], false]);
                swap(temp, j, j+1);
            }
            animations.push([[j, j+1], [BAR_COLOR, BAR_COLOR], true]);
        }
    }
    return animations;
}

function swap(array, a, b) {
    if(array != null && a < array.length && b < array.length) {
        let temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
}