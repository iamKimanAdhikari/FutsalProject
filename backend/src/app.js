import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };

app.use(cors(corsOptions))

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
app.use(express.static('public'));


import ownerRouter from './routes/owner.route.js';
import turfRouter from './routes/turf.route.js';
import userRouter from './routes/user.route.js';
import bookingRouter from './routes/booking.route.js';


app.use('/api/v1/owners', ownerRouter);
app.use('/api/v1/turfs', turfRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

export default app;