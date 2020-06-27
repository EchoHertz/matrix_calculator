/**
 * 버튼 이벤트 리스너
 */
const generator = document.getElementById('generator')
const addBtn = document.getElementById('add')
const gapBtn = document.getElementById('gap')
const mulBtn = document.getElementById('mul')

/**
 * 행렬 생성기
 */
const left = (<HTMLInputElement>document.getElementById('left'))
const right = (<HTMLInputElement>document.getElementById('right'))
const where = (<HTMLSelectElement>document.getElementById('where'))

/**
 * 좌항 우항 컨테이너
 */
const leftContainer = (document.getElementById('left-container'))
const rightContainer = (document.getElementById('right-container'))

generator.addEventListener('click',(event) => {matrixGen(left.value, right.value, where.value)})
addBtn.addEventListener('click', (event) => {addMatrix()})
gapBtn.addEventListener('click', (event) => {gapMatrix()})
mulBtn.addEventListener('click', (event) => {multiMatrix()})

var leftMatrix
var rightMatrix

/**
 * 
 * @param x 가로
 * @param y 세로
 * @param where 항
 * @description 가로 x 세로 y 만큼의 행렬을 만들어 줍니다.
 */
function matrixGen(x:any, y:any, z:any):void {
    let reg = /^[0-9]*$/

    if(!reg.test(x)){
        alert('가로는 숫자만 입력하여 주세요')
    } else if(!reg.test(y)){
        alert('세로는 숫자만 입력하여 주세요')
    } else if(!where.value) {
        alert('항을 선택해주세요.')
    } else {
            let _matrix: number[][] = [];
        for(let i = 0; i < x; i++) {
            let row: number[] = [];
            for(let j = 0; j < y; j++){
                row.push(0)
            }
            _matrix.push(row)
        }

        eval(z + 'Container.innerHTML = matrixToHTMLTable(_matrix, z)')
        eval(z + 'Matrix = _matrix')
    }
}

/**
 * 
 * @param x 가로
 * @param y 세로
 * @param z 우항/좌항
 * @description x, y, z를 'left-0-0'과 같은 형식으로 변환해줍니다.
 */
function numToString(x:number, y:number, z:string):string {
    return `${z}-${x}-${y}`
}
/**
 * 
 * @param str '-'로 구분된 배열을 Arr로 
 */
function stringToArr(str:string):any{
    return str.split('-')
}

function arrToMatrix(arr:string[]){
    
}

function matrixToHTMLTable(matrix:number[][], where:string){
    let i_Max = matrix.length
    let j_Max = matrix[0].length

    let tags:string = '<table>'
    for(let i = 0; i < i_Max; i++) {
        tags += '<tr>'
        for(let j = 0; j< j_Max; j++){
            tags += '<td>'
            tags += `<input type="text" id="${where}-${i}-${j}" name="${where}-${i}-${j}" value="${matrix[i][j]}" />`
            tags += '</td>'
        }
        tags += '</tr>'
    }
    tags += '</table>'

    return tags
}

function addMatrix(){
    let result = []

    if(!leftMatrix) {
        alert('좌항이 생성되지 않았습니다.')
    } else if (!rightMatrix){
        alert('우항이 생성되지 않았습니다.')
    } else if (leftMatrix.length !== rightMatrix.length || leftMatrix[0].length !== rightMatrix[0].length){
        alert('좌항과 우항이 크기가 같아야 합니다.')
    } else {
        for(let i = 0; i< leftMatrix.length; i++) {
            let row = []
            for(let j = 0; j < leftMatrix[i].length; j++){
                row.push(parseFloat((<HTMLInputElement>document.getElementById(`left-${i}-${j}`)).value)+ parseFloat((<HTMLInputElement>document.getElementById(`right-${i}-${j}`)).value))
            }
            result.push(row)
        }
    }
    console.log(result)
}

function gapMatrix(){
    let result = []

    if(!leftMatrix) {
        alert('좌항이 생성되지 않았습니다.')
    } else if (!rightMatrix){
        alert('우항이 생성되지 않았습니다.')
    } else if (leftMatrix.length !== rightMatrix.length || leftMatrix[0].length !== rightMatrix[0].length){
        alert('좌항과 우항이 크기가 같아야 합니다.')
    } else {
        for(let i = 0; i< leftMatrix.length; i++) {
            let row = []
            for(let j = 0; j < leftMatrix[i].length; j++){
                row.push(parseFloat((<HTMLInputElement>document.getElementById(`left-${i}-${j}`)).value) - parseFloat((<HTMLInputElement>document.getElementById(`right-${i}-${j}`)).value))
            }
            result.push(row)
        }
    }
    console.log(result)
}

function multiMatrix() {
    let leftRow:number = leftMatrix.length
    let leftCol:number = leftMatrix[0].length
    let rightRow:number = rightMatrix.length
    let rightCol:number = rightMatrix[0].length
    
    if(!leftMatrix){
        alert(1)
    } else if(!rightMatrix) {
        alert(2)
    } else {
        let result = []
        for(let i = 0; i < leftRow; i++){
            let rows = []
            for(let j = 0; j < rightCol; j++){
               rows.push(calc(i, j, rightRow))
            }
            result.push(rows)
        }
        console.log(result)
    }
}

function calc(row:number, col:number, length:number):number {
    let result = 0
    for(let i = 0; i < length; i++) {
        result += parseFloat((<HTMLInputElement>document.getElementById(`left-${row}-${i}`)).value) * parseFloat((<HTMLInputElement>document.getElementById(`right-${i}-${col}`)).value)
    }
    return result
}