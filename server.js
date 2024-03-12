import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import mongoose from "mongoose"
import cors from  'cors';

config({
    path: "./config/config.env"
})

connectDatabase();

app.get("/", (req, res) => {
    res.send("<h1>Working Fine Properly</h1>")
})


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/celeb').then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('Error connecting to MongoDB:', err));

const dataListingSchema = new mongoose.Schema({

});


const DataListing = mongoose.model('DataListings', dataListingSchema);

console.log("jkdlfja", DataListing);

// Controller for product listing
const productListing = async (req, res, next) => {
    console.log('roansom');
    try {
        const allData = await DataListing.find();
        console.log(allData);
        res.send(allData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
app.get("/datalisting", productListing)

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log("server is running on port " + process.env.PORT);
})
