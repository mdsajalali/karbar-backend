const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karbar:karbar@cluster0.u5pbhxs.mongodb.net/karbar?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
connectToDatabase();

// Schema for Creating Products
const productSchema = new mongoose.Schema({
  tag: String,
  image: String,
  name: String,
  title: String,
  price: Number,
  rating: Number,
  reviews: Number,
  category: String,
  size: String,
  sizes: String,
  color: String,
  desc: String,
});

const Product = mongoose.model("Product", productSchema);

// Schema for Creating Blogs
const blogSchema = new mongoose.Schema({
  image: String,
  title: String,
  desc: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// API CREATION
app.get("/", (req, res) => {
  res.send("Karbar App is Running");
});

// product api start here
app.get("/getProduct", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// blogs api end here

// blogs api start here
app.get("/getBlog", async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blog" });
  }
});

app.post("/addBlog", async (req, res) => {
  try {
    const newBlog = req.body;
    const product = new Blog(newBlog);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to add blog" });
  }
});

app.delete("/deleteBlog/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Blog" });
  }
});

// blogs api end here

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
