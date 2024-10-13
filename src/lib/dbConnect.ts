import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}
const connection:ConnectionObject={

}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try{
        const db=await mongoose.connect('mongodb+srv://root:babyboss@cluster0.5mes4.mongodb.net/Intern?retryWrites=true&w=majority')
        connection.isConnected=db.connections[0].readyState
    }catch(error){
        console.log("Database connection failed",error)
        process.exit(1)
    }
}

export default dbConnect