import {BAR_COLOR, COMPARISON_COLOR, SORTED_COLOR} from '../Visualizer/Graph'

export function getMergeSortArray(array) {
    let result = array.slice(0);
    let auxillaryArray = array.slice(0);
    mergeSortHelper(result, auxillaryArray, 0, result.length-1);
    return result;
}

function mergeSortHelper(array, auxillaryArray, start, end) {
    if(start === end) {
        return;
    }
    let middle = Math.floor((start+end)/2);
    // end must be at least 1 greater than start here, so divide again
    mergeSortHelper(array, auxillaryArray, start, middle);
    mergeSortHelper(array, auxillaryArray, middle+1, end);
    merge(array, auxillaryArray, start, middle, end);
}

function merge(array, auxillaryArray, start, middle, end) {
    let headOne = start;
    let headTwo = middle+1;
    // The two halves must be in order, so merge them
    for(let i = start; i <= end; i++) {
        // Four possibilities:
        // The first list has already been entirely merged
        if(headOne > middle) {
            auxillaryArray[i] = array[headTwo];
            headTwo++;
        // The second list has already been entirely merged
        } else if(headTwo > end) {
            auxillaryArray[i] = array[headOne];
            headOne++;
        // The head of the first list should go in next
        } else if(array[headOne] < array[headTwo]) {
            auxillaryArray[i] = array[headOne];
            headOne++;
        // The head of the second list should go in next
        } else {
            auxillaryArray[i] = array[headTwo];
            headTwo++;
        }
    }
    // Copy the merged arrays back into the original
    for(let i = start; i <= end; i++) {
        array[i] = auxillaryArray[i];
    }
}

export function getMergeSortAnimations(array) {
    let result = array.slice(0);
    let auxillary = array.slice(0);
    let animations = [];

    mergeAnimationHelper(result, auxillary, 0, result.length-1, animations);

    return animations;
}

function mergeAnimationHelper(array, auxillaryArray, start, end, animations) {
    if(start === end) {
        return;
    }
    let middle = Math.floor((start+end)/2);
    // end must be at least 1 greater than start here, so divide again
    mergeAnimationHelper(array, auxillaryArray, start, middle, animations);
    mergeAnimationHelper(array, auxillaryArray, middle+1, end, animations);
    mergeAnimate(array, auxillaryArray, start, middle, end, animations);
}

function mergeAnimate(array, auxillaryArray, start, middle, end, animations) {
    let headOne = start;
    let headTwo = middle+1;
    // The two halves must be in order, so merge them
    for(let i = start; i <= end; i++) {
        // Four possibilities:
        // The first list has already been entirely merged
        if(headOne > middle) {
            animations.push([[headTwo], [COMPARISON_COLOR], true]);     // Highlight the bar
            animations.push([[headTwo], [BAR_COLOR], true]);            // Un-highlight the bar
            auxillaryArray[i] = array[headTwo];
            headTwo++;
        // The second list has already been entirely merged
        } else if(headTwo > end) {
            animations.push([[headOne], [COMPARISON_COLOR], true]);
            animations.push([[headOne], [BAR_COLOR], true]);
            auxillaryArray[i] = array[headOne];
            headOne++;
        // The head of the first list should go in next
        } else if(array[headOne] < array[headTwo]) {
            animations.push([[headOne], [COMPARISON_COLOR], true]);
            animations.push([[headOne], [BAR_COLOR], true]);
            auxillaryArray[i] = array[headOne];
            headOne++;
        // The head of the second list should go in next
        } else {
            animations.push([[headTwo], [COMPARISON_COLOR], true]);
            animations.push([[headTwo], [BAR_COLOR], true]);
            auxillaryArray[i] = array[headTwo];
            headTwo++;
        }
    }
    // Copy the merged arrays back into the original
    for(let i = start; i <= end; i++) {
        array[i] = auxillaryArray[i];
        animations.push([[i], [SORTED_COLOR], true]);
        animations.push([[i], [array[i]], false]);
        animations.push([[i], [BAR_COLOR], true]);
    }
}