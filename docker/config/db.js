import mongoose from 'mongoose';


const connectorchDB = async () => {
    try {

        const db = await mongoose.connect(`${process.env.mongo_url}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`MongoDB Connected: ${db.connection.host}`.bgGreen.white);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectorchDB;