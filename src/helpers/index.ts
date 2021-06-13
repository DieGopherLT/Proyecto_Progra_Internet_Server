export const MergeSort = <T>(original: T[], callback: (...args: T[]) => boolean) => {
    if (original.length <= 1)
        return original;

    let left: T[] = [];
    let right: T[] = [];

    const middle = original.length / 2;
    for (let i = 0; i < middle; i++) {
        left.push(original[i]);
    }

    for (let i = middle; i < original.length; i++) {
        right.push(original[i]);
    }

    //Acciones recursivas
    left = MergeSort(left, callback);
    right = MergeSort(right, callback);
    return Merge(left, right, callback);
}

const Merge =  <T>(left: T[], right: T[], callback: (...args: any[]) => boolean) => {
    let finalArray: T[] = []

    //Mientras haya elementos que comparar
    while (left.length > 0 || right.length > 0)
    {
        if (left.length > 0 && right.length > 0)
        {
            if (callback()) {
                finalArray.push(left[0]);
                left.shift();
            }
            else {
                finalArray.push(right[0]);
                right.shift();
            }
        }
        else if (left.length > 0) {
            finalArray.push(left[0]);
            left.shift();
        }
        else if (right.length > 0) {
            finalArray.push(right[0]);
            right.shift();
        }
    }
    return finalArray;
}
