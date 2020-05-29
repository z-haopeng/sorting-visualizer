import {BAR_COLOR, COMPARISON_COLOR} from '../Visualizer/Graph'

export function getInsertionSortArray(array) {
    let result = array.slice(0);
    for(let i = 1; i < result.length; i++) {
        let j = i;
        while(j > 0 && result[j-1] > result[j]) {
            swap(result, j-1, j);
            j--;
        }
    }
    return result;
}

export function getInsertionSortAnimations(array) {
    let animations = [];
    let temp = array.slice(0);
    for(let i = 1; i < temp.length; i++) {
        let j = i;
        animations.push([[j-1, j], [COMPARISON_COLOR, COMPARISON_COLOR], true]);        // Highlight compared indices
        while(j > 0 && temp[j-1] > temp[j]) {
            animations.push([[j-1, j], [temp[j], temp[j-1]], false]);   // Swap their heights
            animations.push([[j-1, j], [BAR_COLOR, BAR_COLOR], true]);    // Un-highlight those indices
            swap(temp, j-1, j);
            j--;
            if(j > 0) {
                animations.push([[j-1, j], [COMPARISON_COLOR, COMPARISON_COLOR], true]);// Highlight the next pair
            }
        }
        if(j > 0) {
            animations.push([[j-1, j], [BAR_COLOR, BAR_COLOR], true]);    // Un-highlight the final pair
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