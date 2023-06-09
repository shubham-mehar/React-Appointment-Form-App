import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { config } from "dotenv";

const app = express();
config({ path:"./config.env" })

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,
    { dbName: "appointmentapi" }).then(() => console.log("Database Connected!"))
    .catch((e) => console.log(e));

const schema = new mongoose.Schema(
    { 
        name:  { type: String, required: true }, 
        email: { type: String, required: true }, 
        phone: { type: String, required: true }, 
        date:  { type: Date, required: true } 
    }
);
const Appointment = mongoose.model("Appointment", schema);

app.get("/", (req, res) => {
    res.send("API is Working!") 
});

app.post("/appointments", async (req, res) => {
    try {
        const { name, email, phone, date } = req.body;
        
        if (!name || !email || !phone || !date) {
            throw new Error("Missing required field(s)");
          }

        await Appointment.create({ name, email, phone, date });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error saving appointment"
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});