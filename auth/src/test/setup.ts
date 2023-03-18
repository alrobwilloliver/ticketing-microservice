import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri()
    await mongoose.connect(uri)
})

afterAll(async () => {
    await mongod.stop()
    await mongoose.connection.close()
    await mongoose.disconnect()
})

afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
})

