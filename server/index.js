const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// connect to mongodb
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    // create db and collection
    const db = client.db("book-management");
    const bookcollection = db.collection("books");

    // create Book
    app.post("/book", async (req, res) => {
      try {
        const book = await bookcollection.insertOne(req.body);
        res.json({
          message: "Book Created Sucessfully.",
          book,
        });
      } catch (error) {
        res.json({ message: error.message });
      }
    });

    // Read Book
    app.get("/", async (req, res) => {
      const { page, limit, search, genre, minPrice, maxPrice, sort } =
        req.query;

      const currentPage = Math.max(1, parseInt(page) || 1);
      const showResult = parseInt(limit) || 5;
      const skip = (currentPage - 1) * showResult;

      const filter = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ];
      }

      if (genre) {
        filter.genre = genre;
      }

      if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
          filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
          filter.price.$lte = Number(maxPrice);
        }
      }

      let sortOption = {};

      if (sort == "newtoold") {
        sortOption.publishedYear = 1;
      }

      if (sort == "oldtonew") {
        sortOption.publishedYear = -1;
      }

      if (sort === "hightolow") {
        sortOption.price = -1;
      }

      if (sort === "lowtohigh") {
        sortOption.price = 1;
      }

      try {
        const books = await bookcollection.find(filter).sort(sortOption).skip(skip).limit(showResult).toArray();
        const totalBooks = await bookcollection.countDocuments(filter);

        res.json({
          books,
          totalBooks,
          currentPage,
          totalPages: Math.ceil(totalBooks / showResult),
        });
      } catch (error) {
        res.json({ message: error.message });
      }
    });

    // Single Book Find
    app.get("/:id", async (req, res) => {
      try {
        const book=await bookcollection.find({_id:new ObjectId(req.params.id)}).toArray()
        res.json({book})
      } catch (error) {
                res.json({ message: error.message });
      }
    });

    // Delete Book
    app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      try {
        await bookcollection.deleteOne({ _id: new ObjectId(id) });
        res.json({ message: "Book Deleted Successfully" });
      } catch (error) {
        res.json({ message: error.message });
      }
    });

    // Update Book
    app.patch("/:id", async (req, res) => {
      const id = req.params.id;
      try {
        await bookcollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...req.body } },
        );
        res.json({ message: "Book Updated Successfully" });
      } catch (error) {
        res.json({ message: error.message });
      }
    });

    console.log("Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
