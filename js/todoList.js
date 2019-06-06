window.addEventListener('load',function () {
    let tab =document.querySelectorAll(".tab>li");//接收标题
    let prev =0;
    let content =document.querySelector(".content");//内容容器
    let type ="all";
    let flag ={all:'all',done:true,doing:false};
    //所有信息
    let todolist =[
        {
            id: 1, content:"端午节要交作业" , ctime:"2019/5/29" ,status:false
        },
        {
            id: 2, content:"不想交作业" , ctime:"2019/6/4" ,status:false
        },
        {
            id:3, content:"企业文档" , ctime:"2019/6/10" ,status:true
        },
        {
            id:4, content:"本地存储" , ctime:"2019/5/30" ,status:true
        }
    ];

    // todolist = localStorage.getItem(todolist)?JSON.parse(localStorage.getItem("todolist"))

    /////////////////////////////判断是否存在todolist，没有时保存
    let str =localStorage.getItem("todolist");
    if(!str){
        saveData();
        str =localStorage.getItem("todolist");
    }
    todolist = JSON.parse(str);



    //蓝色背景的点击变换
    tab.forEach(function (ele,index) {
        ele.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev=index;
            type =this.getAttribute('type');
            render(filterData(type));
        }
    });
    tab[0].onclick();


////////////////////////////修改状态///////////////////////////////

    content.onclick =function (e) {
        let target =e.target;
        let id = target.parentNode.id;
        if(target.nodeName=="DEL"){
            let index =todolist.findIndex(ele=>ele.id==id);
            todolist.splice(index,1);
        }else if(target.nodeName == "INPUT"){
            let ele =todolist.filter(ele=>ele.id==id)[0];
            ele.status = target.checked;
        }
        saveData();
        render( filterData(type) );
    };


    ///////////////////添加//////////////////////
    let forms = document.forms[0];
    let textBtn = forms.elements["content"];
    let submitBtn =forms.elements[1];

    submitBtn.onclick=function (e) {
        e.preventDefault();
        let obj = createObj();
        todolist.push(obj);
        forms.reset();
        render(filterData(type));
        saveData();
    };

    ///////////////saveDate////////////////////////
    function saveData(){
        localStorage.setItem("todolist",JSON.stringify(todolist));
    }

    /////////////////createObj//////////////////////

    function createObj() {
        let id =todolist[todolist.length-1].id + 1;
        let content =textBtn.value;
        let ctime =new Date().toLocaleDateString();
        let status =false;
        return {id,content,ctime,status};
    }

    /////////////////////////////////////////////
    function filterData(type) {
        let arr=[];
        switch (type){
            case "all":
                arr=todolist;
                break;
            case "done":
                arr=todolist.filter(ele=>ele.status);
                break;
            case "doing":
                arr =todolist.filter(ele=>!ele.status);
                break;
        }
        return arr;
    }

    //渲染列表
    function render(arr) {
        let html = "";
        arr.forEach(function (elem,index) {
            if(elem.status){
                html+=`
            <li id="${elem.id}">
            <input type="checkbox" checked>
             <p>${elem.content}</p>
             <del>X</del>
             <time>${elem.ctime}</time>

        </li>
            `;
            }else{
                html+=`
            <li id="${elem.id}">
            <input type="checkbox"> 
            <p>${elem.content}</p>
             <del>X</del>
             <time>${elem.ctime}</time>
        </li>
            `;
            }
        });
        content.innerHTML=html;
    }
});
