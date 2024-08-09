import { Router } from 'express';

import {
    createBooking,
    getUserBookings,
    getTurfBookings,
    cancelBooking,
    getOwnerBookings
} from "../controllers/booking.controller.js";

const router = Router();

//router for Creating Booking

router.post('/turfs', createBooking);

//router for getting bookings for a specific turf

router.get('/turf/:turf_id', getTurfBookings);

//router for getting bookings for a specific user

router.get('/user/:user_id', getUserBookings);

//router for getting bookings for a specific user

router.get('/owner/:owner_id', getOwnerBookings);

//router for cancelling bookings

router.patch('/cancel/:booking_id', cancelBooking); //patch is used because we only have to update the status field to mark it as cancelled

export default router;