//获取节点
const draggableList =document.getElementById('draggable-list');
const check =document.getElementById('check');


//前十富豪
const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Bernard Arnault',
    'Warren Buffett',
    'Mark Zuckerberg',
    'Amancio Ortega',
    'Larry Ellison',
    'Larry Page',
    'Steve Ballmer',
    'Carlos Slim Helu'
]
//储存所有list
const listItems=[];

let dragStartIndex;

createList();

//创建createList函数,将li插入DOM节点
function createList(){
    [...richestPeople]
    .map(a=>({value:a,sort:Math.random()}))
    .sort((a,b)=>(a.sort-b.sort))
    .map(a=>a.value)
    .forEach((person,index)=>{
        // console.log(person)
        const listItem =document.createElement('li');
        // listItem.classList.add('right')
        listItem.setAttribute('data-index',index);
        listItem.innerHTML=`
        <span class="number">${index+1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">
            ${person}
            </p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        listItems.push(listItem);
        draggableList.appendChild(listItem)

    })
    //事件监听
    addEventListeners();
}

//拖拽函数
function dragStart(){
    dragStartIndex=this.closest('li').getAttribute('data-index');
  
}
function dragOver(){
    event.preventDefault()
}
function dragEnter(){
    event.preventDefault()
    this.classList.add("over")
}
function dragLeave(){
    this.classList.remove("over")
}
function dragDrop(){
    const dragEndIndex=this.closest('li').getAttribute('data-index');
    swapItems(dragStartIndex,dragEndIndex)
    this.classList.remove("over")
}


//调换位置
function swapItems(fromIndex,toIndex){
    // console.log(fromIndex,toIndex)
    const itemOne =listItems[fromIndex].querySelector('.draggable')
    const itemTwo =listItems[toIndex].querySelector('.draggable')
    // console.log(itemOne,itemTwo)
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
    // console.log(listItems)
}

//检查排序
function checkOrder(){
    console.log(12)
    listItems.forEach((listItem,index)=>{
        const personName =listItem.querySelector('.draggable').innerText.trim();
        if(personName !==richestPeople[index]){
            listItem.classList.add('wrong')
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right')
        }
    })
}
//事件监听
function addEventListeners(){
    const draggables =document.querySelectorAll('.draggable');
    const dragListItems =document.querySelectorAll('.draggable-list li')
    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',dragStart)
    })
    dragListItems.forEach(item=>{
        item.addEventListener('dragenter',dragEnter)
        item.addEventListener('dragover',dragOver)
        item.addEventListener('dragleave',dragLeave)
        item.addEventListener('drop',dragDrop)
    })
}

//检查排序
check.addEventListener('click',checkOrder)
