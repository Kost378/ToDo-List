
const tasks = JSON.parse(localStorage.getItem("tasks"));


/*const tasks = [
  
  {
  _id: Math.random(),
  title: "Lorem",
  desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam impedit sunt porro? Eum, dolor porro? Assumenda ipsum eos iure perferendis, fugit earum. Voluptates nulla voluptate rerum quam excepturi temporibus vero!',
  completed: true,
  },
];
*/
localStorage.setItem("tasks", JSON.stringify(tasks));



let themes = {
  light: {  
    "--background-body": "#f0f0f0",
    "--background-section": "#e5e5e5",
    "--text-color": "rgb(77, 77, 77)",
    "--background-description": "#ffffff",
    "--background-submit": "rgb(76, 118, 227)",
    "--background-del": "rgb(223, 89, 89)",
    "--selection-color": "rgb(150, 150, 150)",
    },
  dark: {
    "--background-body": "rgb(16, 20, 34)",
    "--background-section": "rgb(27, 35, 59)",
    "--text-color": "#000",
    "--background-description": "rgb(81, 89, 112)",
    "--background-submit": "rgb(29, 61, 119)",
    "--background-del": "rgb(120, 38, 38)",
    "--selection-color": "rgb(190, 190, 190)",
  },
}
let themeSelect = document.querySelector("#theme");
let lastSelectedTheme = localStorage.getItem("lastSelectedTheme") || 'light';


  if (lastSelectedTheme !== "light"){
    setTheme(lastSelectedTheme);
    themeSelect.value = lastSelectedTheme;
  }


let temp = document.querySelector("#task_temp");
let title = temp.content.querySelector("h2");
let desc = temp.content.querySelector("p");
(function(arrOfTasks){
  arrOfTasks.forEach(function(item){
    insertTask(item);

  })
  
})(tasks)
function addTask(newTitle, newDesc){
  tasks.push({
    _id: Math.random(),
    title: newTitle,
    desc: newDesc,
    completed: false,
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function insertTask(obj){
  title.textContent = obj.title;
  desc.textContent = obj.desc;
  let clone = document.importNode(temp.content, true);
  //console.dir(clone.children[0]);
  clone.children[0].setAttribute('id', obj._id);



  document.body.appendChild(clone);


  addEventDel(document.body.lastElementChild.querySelector("button"));
}
function addEventDel(btn){
  btn.addEventListener("click", function deletTask(){
    let task = this.closest(".task");
    let isConfirmed = confirm("Вы действительно хотите удалить задачу?")
    if(!isConfirmed)   return;
    tasks.forEach(function(item, i){ 
      if(item._id == task.getAttribute('id'))
        tasks.splice(i, 1);
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    task.style.display = "none";


  })
}


let btnAddTask = document.querySelector("input[type = 'submit']")


btnAddTask.addEventListener('click', function(){
  event.preventDefault();
  let title = document.querySelector("input[type = 'text']");
  let desc = document.querySelector("textarea");

  if(title.value){
    addTask(title.value, desc.value || title.value);
    insertTask(tasks[tasks.length - 1]);
    title.value = "";
    desc.value = "";
  }
  else alert("Заполните все поля");
})




themeSelect.addEventListener("change", onThemeSelectHandler)


function onThemeSelectHandler(e){
  const selectedTheme = themeSelect.value;
  let isConfirmed = confirm(`Вы действительно хотите изменить тему на ${selectedTheme}`);
  if (!isConfirmed) {
    themeSelect.value = lastSelectedTheme;
    return;
  }

  setTheme(selectedTheme);
}
function setTheme(name){
  const selectedThemObj = themes[name];
  Object.entries(selectedThemObj).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  localStorage.setItem('lastSelectedTheme', name);
}