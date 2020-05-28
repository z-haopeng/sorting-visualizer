import {BAR_COLOR, COMPARISON_COLOR, SORTED_COLOR} from '../Visualizer/Graph';

export function getQuickSortArray(array) {
    let result = array.slice(0);
    quickSortHelper(result, 0, result.length-1);
    return result;
}

function quickSortHelper(array, low, high) {
    if(low >= high)
        return;

    let pivotIdx = partition(array, low, high);

    quickSortHelper(array, low, pivotIdx - 1);
    quickSortHelper(array, pivotIdx + 1, high);

}

function partition(array, low, high) {
    let pivot = array[low];
    let i = low+1;
    for(let j = low+1; j <= high; j++) {
        if(array[j] < pivot) {
            swap(array, i, j);
            i++;
        }
    }
    swap(array, i-1, low);
    return i-1;
}

export function getQuickSortAnimations(array) {
    let result = array.slice(0);
    let animations = [];
    animationHelper(result, 0, result.length-1, animations);
    console.log(result);
    return animations;
}

function animationHelper(array, low, high, animations) {
    if(low >= high)
        return;

    let pivot = array[low];
    animations.push([[low], [SORTED_COLOR], true]);
    let i = low;
    for(let j = low+1; j <= high; j++) {
        animations.push([[i+1, j], [COMPARISON_COLOR, COMPARISON_COLOR], true]);
        if(array[j] < pivot) {
            i++;
            animations.push([[i, j], [array[j], array[i]], false]);
            animations.push([[i, j], [BAR_COLOR, BAR_COLOR], true]);
            swap(array, i, j);
        } else if(j === high){
            animations.push([[i+1, j], [BAR_COLOR, BAR_COLOR], true]);
        } else {
            animations.push([[j], [BAR_COLOR], true]);
        }
        
    }
    animations.push([[i], [SORTED_COLOR], true]);
    animations.push([[i, low], [array[low], array[i]], false]);
    animations.push([[i, low], [BAR_COLOR, BAR_COLOR], true]);
    swap(array, i, low);

    animationHelper(array, low, i-1, animations);
    animationHelper(array, i+1, high, animations);
}

function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}