import mongoose from 'mongoose'
const connection = mongoose.connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 1,
  family: 4
}).catch(error => {
  console.error(`Connect to MongoDB got error: ${error}`)
})
connection.on('error', error => console.error(`Connect to MongoDB got error: ${error}`))
connection.on('connected', () => console.log(`Connected to MongoDB`))