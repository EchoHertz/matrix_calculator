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

generator.addEventListener('click',(event) => {metrixGen(left.value, right.value, where.value)})
addBtn.addEventListener('click', (event) => {addMetrix()})
gapBtn.addEventListener('click', (event) => {gapMetrix()})
mulBtn.addEventListener('click', (event) => {multiMetrix()})

var leftMetrix
var rightMetrix

/**
 * 
 * @param x 가로
 * @param y 세로
 * @param where 항
 * @description 가로 x 세로 y 만큼의 행렬을 만들어 줍니다.
 */
function metrixGen(x:any, y:any, z:any):void {
    let reg = /^[0-9]*$/

    if(!reg.test(x)){
        alert('가로는 숫자만 입력하여 주세요')
    } else if(!reg.test(y)){
        alert('세로는 숫자만 입력하여 주세요')
    } else if(!where.value) {
        alert('항을 선택해주세요.')
    } else {
            let _metrix: number[][] = [];
        for(let i = 0; i < x; i++) {
            let row: number[] = [];
            for(let j = 0; j < y; j++){
                row.push(0)
            }
            _metrix.push(row)
        }

        eval(z + 'Container.innerHTML = metrixToHTMLTable(_metrix, z)')
        eval(z + 'Metrix = _metrix')
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

function arrToMetrix(arr:string[]){
    
}

function metrixToHTMLTable(metrix:number[][], where:string){
    let i_Max = metrix.length
    let j_Max = metrix[0].length

    let tags:string = '<table>'
    for(let i = 0; i < i_Max; i++) {
        tags += '<tr>'
        for(let j = 0; j< j_Max; j++){
            tags += '<td>'
            tags += `<input type="text" id="${where}-${i}-${j}" name="${where}-${i}-${j}" value="${metrix[i][j]}" />`
            tags += '</td>'
        }
        tags += '</tr>'
    }
    tags += '</table>'

    return tags
}

function addMetrix(){
    let result = []

    if(!leftMetrix) {
        alert('좌항이 생성되지 않았습니다.')
    } else if (!rightMetrix){
        alert('우항이 생성되지 않았습니다.')
    } else if (leftMetrix.length !== rightMetrix.length || leftMetrix[0].length !== rightMetrix[0].length){
        alert('좌항과 우항이 크기가 같아야 합니다.')
    } else {
        for(let i = 0; i< leftMetrix.length; i++) {
            let row = []
            for(let j = 0; j < leftMetrix[i].length; j++){
                row.push(parseFloat((<HTMLInputElement>document.getElementById(`left-${i}-${j}`)).value)+ parseFloat((<HTMLInputElement>document.getElementById(`right-${i}-${j}`)).value))
            }
            result.push(row)
        }
    }
    console.log(result)
}

function gapMetrix(){
    let result = []

    if(!leftMetrix) {
        alert('좌항이 생성되지 않았습니다.')
    } else if (!rightMetrix){
        alert('우항이 생성되지 않았습니다.')
    } else if (leftMetrix.length !== rightMetrix.length || leftMetrix[0].length !== rightMetrix[0].length){
        alert('좌항과 우항이 크기가 같아야 합니다.')
    } else {
        for(let i = 0; i< leftMetrix.length; i++) {
            let row = []
            for(let j = 0; j < leftMetrix[i].length; j++){
                row.push(parseFloat((<HTMLInputElement>document.getElementById(`left-${i}-${j}`)).value) - parseFloat((<HTMLInputElement>document.getElementById(`right-${i}-${j}`)).value))
            }
            result.push(row)
        }
    }
    console.log(result)
}

function multiMetrix() {

}