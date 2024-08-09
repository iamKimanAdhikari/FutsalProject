import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import pool from "../db/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const ownerTokenVerification = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const owner = await pool.query('select id, fullName, username, email, phone_no from Owners where id = $1;', [decodedToken?.id]);


        if (!owner.rowCount) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.owner = owner.rows[0];
        next()
    }
    catch (error) {
        res.status(402)
        .json(
            new ApiResponse(402, "Access Denied", "Failed")
        )
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}
)

export { ownerTokenVerification }
