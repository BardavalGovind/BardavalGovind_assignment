import express from 'express';
import dotenv from 'dotenv';
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/calculate", deliveryRoutes);

app.get("/", (req, res) => {
  res.send("API is running. Use POST /calculate in Postman.");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})