const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

const defaultCompare = (a, b) => {
  if (a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

let swaps = []

const partition = (array, left, right, compareFn) => {
  const pivot = array[Math.floor((right + left) / 2)]

  let i = left
  let j = right

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    } while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--
    }
    if (i <= j) {
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
      swaps.push({ firstPostion: i, lastPosition: j })
      i++
      j--
    }
  }

  return i
}

const quick = (array, left, right, compareFn) => {
  let index

  if (array.length > 1) {
    index = partition(array, left, right, compareFn)
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn)
    }
    if (index < right) {
      quick(array, index, right, compareFn)
    }
  }

  return array
}

class SortingAlgorithms {
  bubbleSort(array) {
    const swaps = []
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]]
          swaps.push({ firstPostion: j, lastPosition: j + 1 })
        }
      }
    }
    return swaps
  }

  selectionSort(array) {
    const swaps = []
    for (let i = 0; i < array.length - 1; i++) {
      let min = i
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[min]) {
          min = j
        }
      }
      if (min !== i) {
        [array[i], array[min]] = [array[min], array[i]]
        swaps.push({ firstPostion: i, lastPosition: min })
      }
    }
    return swaps
  }

  quickSort(array, compareFn = defaultCompare) {
    swaps = []
    quick(array, 0, array.length - 1, compareFn)
    return swaps
  }

  insertionSort(array) {
    const swaps = []
    for (let i = 1; i < array.length; i++) {
      let j = i
      while (j > 0 && array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]]
        swaps.push({ firstPostion: j, lastPosition: j - 1 })
        j--
      }
    }
    return swaps
  }

  heapSort(array) {
    const swaps = []

    function heapify(arr, n, i) {
      let largest = i
      const l = 2 * i + 1
      const r = 2 * i + 2

      if (l < n && arr[l] > arr[largest]) largest = l
      if (r < n && arr[r] > arr[largest]) largest = r

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]
        swaps.push({ firstPostion: i, lastPosition: largest })
        heapify(arr, n, largest)
      }
    }

    const n = array.length

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i)
    }

    for (let i = n - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]]
      swaps.push({ firstPostion: 0, lastPosition: i })
      heapify(array, i, 0)
    }

    return swaps
  }
}


export {
  SortingAlgorithms
}