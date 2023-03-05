import mongoose from 'mongoose';
async function dbConnector() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DATABASE as string);
    } catch (error) {
        console.log(error);
    }
}

export default dbConnector;
