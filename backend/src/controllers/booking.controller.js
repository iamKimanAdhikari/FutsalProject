import { asyncHandler } from "../utils/asyncHandler.js";
import pool from '../db/index.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const checkAvailability = async (turf_id, booking_date, time_slot) => {
    try {
        const result = await pool.query(
            'SELECT * FROM bookings WHERE turf_id = $1 AND booking_date = $2 AND time_slot = $3',
            [turf_id, booking_date, time_slot]
        );
        return result.rowCount === 0;                                   // No existing bookings
    } catch (error) {
        console.error("Error checking Availability: ", error);
        throw new ApiError(500, "Error checking availability");
    }
};


//for creating a booking
    
const createBooking = asyncHandler(async (req, res) => {
    const { user_id, turf_id, booking_date, time_slot } = req.body;

    if (!user_id || !turf_id || !booking_date || !time_slot) {
        return res.status(400).json(
            new ApiError(400, "All fields are required!")               //status code 400 for Bad Request
        );
    }

    const isAvailable = await checkAvailability(turf_id, booking_date, time_slot);

    if (!isAvailable) {
        return res.status(409).json(                                    //status code 409 for collision
            new ApiError(409, "Turf is not available for the selected date and time")
        );
    }

    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, turf_id, booking_date, time_slot) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, turf_id, booking_date, time_slot]
        );

        res.status(201).json(                                           //status code 201 for successfull booking
            new ApiResponse(201, result.rows[0], "Booking successful.") 
        );
    } catch (error) {
        res.status(500).json(                                           //status code 500 for internal server error                 
            new ApiError(500, "Booking Failed")
        );
    }
});


//get all the bookings for the turf
const getTurfBookings = asyncHandler(async (req, res) => {
    const { turf_id } = req.params;

    if (!turf_id) {
        return res.status(400).json(
            new ApiError(400, null, "Turf Id is Required!")
        );
    }

    try {
        const turfBookings = await pool.query(
            'SELECT * FROM bookings WHERE turf_id = $1',
            [turf_id]
        );

        return res.status(200).json(
            new ApiResponse(200, turfBookings.rows, "Successfully retrieved turf bookings")
        );
    } catch (error) {
        console.error("Error fetching turf bookings:", error);

        return res.status(500).json(
            new ApiError(500, null, "Could not fetch the data")
        );
    }
});


//get bookings for a specific user

const getUserBookings = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json(
            new ApiError(400, null, "User Id is required")
        );
    }

    try {
        const result = await pool.query(
            'SELECT * FROM bookings WHERE user_id = $1',
            [user_id]
        );

        return res.status(200).json(
            new ApiResponse(200, result.rows, "User Bookings Retrieved Successfully!")
        );
    } catch (error) {
        console.error("Error fetching User Bookings: ", error);

        return res.status(500).json(
            new ApiError(500, null, "Failed to retrieve User Bookings")
        );
    }
});



const cancelBooking = asyncHandler(async(req, res) => {
    const { booking_id } = req.params;

    if (!booking_id) {
        return res.status(400).json(
            new ApiError(400, null, "Booking ID is required")
        );
    }

    try {
        const result = await pool.query(
            'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
            ['canceled', booking_id]
        );

        // If no rows are affected, the booking ID might be invalid
        if (result.rowCount === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Booking not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, result.rows[0], "Booking canceled successfully")
        );
    } catch (error) {
        console.error("Error canceling booking:", error); // Log the error for debugging

        return res.status(500).json(
            new ApiError(500, null, "Failed to cancel booking")
        );
    }
});

const getOwnerBookings = asyncHandler(async (req, res) => {
    const { owner_id } = req.params;

    if (!owner_id) {
        return res.status(400).json(
            new ApiError(400, null, "Owner Id is required")
        );
    }

    try {
        const result = await pool.query(
            `SELECT b.* FROM bookings b
             JOIN turfs t ON b.turf_id = t.id
             WHERE t.owner_id = $1`,
            [owner_id]
        );

        return res.status(200).json(
            new ApiResponse(200, result.rows, "Owner's Turf Bookings Retrieved Successfully!")
        );
    } catch (error) {
        console.error("Error fetching Owner Bookings: ", error);

        return res.status(500).json(
            new ApiError(500, null, "Failed to retrieve Owner Bookings")
        );
    }
});

export {
    createBooking,
    getUserBookings,
    getTurfBookings,
    cancelBooking,
    getOwnerBookings
}

