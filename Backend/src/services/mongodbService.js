import { MongoClient } from 'mongodb';
import { MonogoDB_Config } from '../../config/config.js';

const mongodbDatabase = MonogoDB_Config?.MONGODB_DATABASE;
const connectionString = MonogoDB_Config?.MONGODB_CONNECTION_STRING;

// Global level function to connect to mongo db
// let client;
// (async () => {
//     try {
//         client = new MongoClient(connectionString);
//         await client.connect();
//         console.log('Connected successfully to MongoDB');
//     } catch (err) {
//         console.log('Error occurred while connecting to MongoDB:', err);
//         throw err;
//     }
// })();

// Test the mongodb connetion
const testDBConnection = async () => {
    const client = new MongoClient(connectionString);
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');
        return { status: true, message: 'Monogo DB Connected Successfully' };
    } catch (err) {
        console.log('Error in mongodbService.connectDB service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to find one document
const findOne = async (collection, query) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection.findOne(query);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.findOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to find last document of any collection
const findLastDocument = async (collection) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection?.find()?.sort({ userId: -1 })?.limit(1)?.toArray();
        return data;
    } catch (err) {
        console.log('Error in mongodbService.findOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to insert one document
const insertOne = async (collection, document) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection.insertOne(document);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.insertOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to find and update one document
const findOneAndUpdate = async (collection, filter, updateQuery, options) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection.findOneAndUpdate(filter, updateQuery, options);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.insertOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to update one document
const updateOne = async (collection, updateQuery, filter, options) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection.updateOne(filter, updateQuery, options);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.findOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// MongoDB service to update or insert one document
const updateOrInsertOne = async (collection) => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db(mongodbDatabase);
        const dbCollection = database.collection(collection);
        const data = await dbCollection.upda(filter, updateQuery);
        console.log(data);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.updateOrInsertOne service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    y;
};

// MongoDB service to get data
const GET = async () => {
    const client = new MongoClient(connectionString);
    try {
        const database = client.db('StreamyFy');
        const demo = database.collection('Spotify');
        const query = { _id: 'abc123' };
        const data = await demo.findOne(query);
        console.log(data);
        return data;
    } catch (err) {
        console.log('Error in mongodbService.GET service', err);
        throw err;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

export { GET, findLastDocument, findOne, findOneAndUpdate, insertOne, testDBConnection, updateOne, updateOrInsertOne };
