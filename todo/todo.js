const fs =require('fs');
const filePath = "./tasks.json";

const command=process.argv[2];
const argument=process.argv[3];
const loadTask= () => {
    try {
       const dataBuffer = fs.readFileSync(filePath);
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}
const saveTask=(tasks)=>{
    const dataJSON =JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJSON);
}
const addTask =(task)=>{
    const tasks =loadTask();
    tasks.push({task});
    saveTask(tasks);
    console.log("Tasks added !!");
    
}
const listTasks = () =>{
    const tasks =loadTask();
    tasks.forEach((task,index) => {
        console.log(`${index+1} and ${task.task}`);
        
    });
}
const removeTask =(index)=>{
    const tasks =loadTask();  
    tasks.splice(index-1,1);
    saveTask(tasks);
    console.log("task removed")
}

if(command === "add"){
    addTask(argument);
}else if(command ==="list"){
    listTasks();
}else if (command === "remove"){
    removeTask(parseInt(argument));
}else{
    console.log("CMD not found");  
}
