

export function sort(array, range) {
    const lowerRange = range - 4;
    const upperRange = range;

     array = array.filter( (item) => item.name.length >= lowerRange && item.name.length <= upperRange);

    return array;
    
}