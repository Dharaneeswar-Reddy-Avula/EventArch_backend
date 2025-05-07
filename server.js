import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./routes/event.routes.js"// Import event routes (add .js extension)
import workshopRoutes from "./routes/workshops.routes.js"
import Razorpay from "razorpay";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB:", err));


const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cors()); // Enables CORS

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running...HELLO");
});
app.use("/api/events", eventRoutes);
app.use("/api/workshops",workshopRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


//Razorpay
app.post('/orders',async (req,res)=>{
  const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
  });
  const options={
    amount: req.body.amount,
    currency:req.body.currency,
    receipt:"reciept#1",
    payment_capture:1
  }
try{
  const response =await razorpay.orders.create(options)
  res.json({
    order_id:response.id,
    currency:response.currency,
    amount:response.amount
  })
}
catch(error){
  res.status(500).send("Internal Server error")
}

})

app.get("/payments/:paymentId",async(req,res)=>{
  const {paymentId}=req.params;
  const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
  });
  try{
    const payment = await razorpay.payments.fetch(paymentId)
    if(!payment){
      return res.status(500).json("Error at razorpay loading")
    }
    res.json({
      status:payment.status,
      method:payment.method,
      amount:payment.amount,
      currency:payment.currency,
    })
  }
  catch(error){
    res.status(500).json("Failed to fetch paymnet")
  }

})






// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
