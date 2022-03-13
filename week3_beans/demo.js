
    
// initmap({width:10,height:10},10,10)
//表示初始化一个10*10的网格地图，且包含10个奖励，每个奖励为10分
//返回值 eg:[[null,null,{bonus:10},null,....],[null,null,...]]
let map = [];
let score = 0;
let person = [0,0];
let currenttime=0;

const BONUS_SCORE = 10
const BONUS_COUNT = 10
const MAP_SIZE = {width:10, height:10}
const TIME = 30

const IMAGE_RESOURCES = {}

const IMAGES = [
    {name: 'robot', url:'./image/robot.svg'},
    {name: 'prize', url:'./image/prize.svg'}
]

//判断是否是相同的位置,输入的a和b分别是两个坐标
const isEqualposition = (a,b)=> a[0]==b[0] && a[1] == b[1]
//判断该位置是否已经存在在记录中，position是一个坐标，bonusRecord是一个二维数组
const isInRecord = (position,bonusRecord) => bonusRecord.some(x=>isEqualposition(x,position))
//判断该格子信息是否是prize,输出的是个布尔值
const isBonus = (col) => col && typeof col.bonus === 'number'
//判断此时地图上还是否存在奖杯,every函数是对数组中的每个进行函数内部的判断，这里的map是二维数组
//该函数输出：false-不存在奖杯
const isprizeEmpty = (map) => map.every(row=>row.every(col=>!isBonus(col)))

//初始化奖杯的位置,size是一个对象，count是传入的初始化奖杯的数量，return出来是一个二维数组（表示奖杯位置）
const initBonus = (size,count) =>
{
    const record = [];
    while(record.length < count)
    {
        const row = Math.floor(Math.random()*size.width);
        const col = Math.floor(Math.random()*size.height);
        //这里要注意我们起点默认放置机器人，所以奖杯不能放在起点
        if((row ==0 && col==0) || isInRecord([row,col],record))
        {
            continue; //这次的[row,col]组合不计入record中
        }
        record.push([row,col])
    }
    return record
}

//传入的size是对象（width，height），count是奖杯数量，score是每个奖杯最多分数
const initmap = (size,count,score)=>{
    const map = []
    const bonusRecord = initBonus(size,count);
    for (let row = 0; row<size.width; row++)
    {
        const rowItem = [];
        for(let col = 0;col<size.height;col++)
        {
            if(!isInRecord([row,col],bonusRecord))
            {
                rowItem.push(null)
                continue;
            }
            rowItem.push({bonus:Math.floor(Math.random()*score)})
        }
        map.push(rowItem)
    }
    return map
}

//绘制地图，传入的是地图中每个点的信息
const drawMap = (map)=>
{
    const mapContainer = document.getElementsByClassName('map')[0];
    mapContainer.innerHTML = ''
    for(let [rowIndex, row] of map.entries()) //entries返回数组的键值对，row里面有一行的信息
    {
        const rowEl = document.createElement('div')
        rowEl.className = 'row'
        for(let [colIndex,col] of row.entries()) //col里面有一行的每一个小个子的信息
        {
            const colEl = document.createElement('div');
            colEl.className = 'cell'

            const isBonusCell = isBonus(col) //
            const isPersonCell = isEqualposition(person,[rowIndex,colIndex])

            drawCellWithImages(colEl,{map,rowIndex,colIndex,col},{isBonusCell,isPersonCell})

            rowEl.appendChild(colEl)
        }
        mapContainer.appendChild(rowEl)
    }

}
//制定一个放置图片的容器
const createImageContainer = () =>
{
    const container = document.createElement('div');
    container.className = 'image-container'
    return container
}
//存放的图片
const createImage = (url) =>
{
    const image = new Image();
    image.src = url;
    return image
}

const drawCellWithImages = (container,{map,rowIndex,colIndex,col},{isBonusCell,isPersonCell})=>
{
    if(isPersonCell)
    {
        const person = createImageContainer()
        person.appendChild(createImage(IMAGE_RESOURCES.robot))
        container.appendChild(person)
    }
    if(isBonusCell)
    {
        if(isPersonCell) //机器人和奖杯同一个格子，此时得分，并且将地图上该位置设置为null
        {
            score = score+col.bonus;
            map[rowIndex][colIndex] = null;
        }
        else{
            const bonus = createImageContainer()
            bonus.appendChild(createImage(IMAGE_RESOURCES.prize))
            container.appendChild(bonus)
        }
    }
}

//控制机器人运动
const move = (timer)=>(e) =>
{
    const [y,x] = person //这个是全局变量
    switch(e.code)
    {
        case 'ArrowRight': //向右运动
            person = [y,x+1]
            break;
        case 'ArrowUp':    //向上运动
            person = [y-1,x]
            break;
        case 'ArrowDown':  //向下运动
            person = [y+1,x]
            break;
        case 'ArrowLeft':  //向左运动
            person = [y,x-1]
            break;
        default:
            return;
    }
    console.log(e)
    drawMap(map)  //每次运动后就再次绘制地图
    //显示分数
    const scoreEl=document.getElementsByClassName('score')[0];
    scoreEl.innerHTML=`Score: ${score}`
    //在指定的毫秒数后调用函数或计算表达式。
    //setTimeout在规定时间后执行完某个操作就停止了，setInterval可以一直循环下去
    setTimeout(()=>{
        if(isprizeEmpty(map)){
            alert('Game Complete...')
            clearInterval(timer);
        }
    },0)

    setTimeout(()=>{
        if(score<0){
            alert('Game Complete...')
            clearInterval(timer);
        }
    },0)
}

const startGame=()=>{
    const timerEl=document.getElementsByClassName('time')[0];

    currenttime=TIME; //初始化时间
    timerEl.innerHTML=`time: ${currenttime}s`

    const scoreEl=document.getElementsByClassName('score')[0];
    scoreEl.innerHTML=`score: ${score}`

    //显示当前时间 ( setInterval() 函数会每秒执行一次函数，类似手表)。使用 clearInterval() 来停止执行:
    //每一秒执行一次，显示一次时间
    const timer=setInterval(()=>{
        if(currenttime<=0){
            alert('Game over')
            clearInterval(timer)
            return;
        }
        currenttime--;
        timerEl.innerHTML=`time: ${currenttime}s`
    },1000)
    //在文档中添加点击事件
    document.addEventListener('keydown', move(timer))
}

const loadImage = async({name,url})=>{
	return new Promise((resolve, reject)=>{
		const image = new Image();
		image.src=url;
	
		image.onload=()=>resolve({name,url});
		image.onerror=()=>reject(url)
	})
}
const loadImages=async()=>{
	const images = await Promise.all(IMAGES.map(loadImage))
	for(let{name,url}of images){
	IMAGE_RESOURCES[name]=url
	}
}

const main = async() =>{
    map = initmap(MAP_SIZE,BONUS_COUNT,BONUS_SCORE)
    console.log(map)
    await loadImages()
    drawMap(map)
}

main()
