const fs = require("fs")
const os = require("os")

const EventEmmiter = require("events") //here the events and errs are stored like a class in js so to access it we havwe to use inheritance

class Logger extends EventEmmiter {
    log(message){
        this.emit("message",{message}) // Emit an object so LogToFile can access event.message
    }
    } 
    


const  logger = new Logger();
const logFile = "./eventLog.txt"

const LogToFile = (event) =>{
    const logMessage = `${new Date().toISOString()} - ${event.message} \n`;
    fs.appendFile(logFile, logMessage,(err) => {
    if (err) console.error("Error writing log:", err);
});
}

logger.on("message", LogToFile) //this line listens only when this.emit executes

setInterval(()=>{
    const memoryUsage = (os.freemem() / os.totalmem ())*100;
    logger.log(`Currrent memory usage : ${memoryUsage.toFixed(2)}`);
},3000)

logger.log("application started")