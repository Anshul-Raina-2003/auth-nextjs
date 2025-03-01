import mongoose from 'mongoose';

export default function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!); 
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected to MongoDB");
        });
        connection.on('error', (error) => {
            console.log("Error in db connection, please ensure MongoDB is running: ", error);
        });
            
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
}