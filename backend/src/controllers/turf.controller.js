import { asyncHandler } from "../utils/asyncHandler.js";
import pool from "../db/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";



const getAllTurfs = asyncHandler( async (req, res) => {
    try {
        const allTurfs = await pool.query("select * from turfs;");
        console.log(allTurfs.rows)
        return res.status(200).json(
            new ApiResponse(200, {...allTurfs.rows}, "successfull")
        )
    } catch (error) {
        res.status(501).json(
            new ApiError(501, "Couldnot fetch the data", "Failed")
        )
    }
});

const getTurfById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const requiredTurf = await pool.query("select * from turfs where id = $1;", [id]);
        console.log(requiredTurf.rows)
        return res.status(200).json(
            new ApiResponse(200, {...requiredTurf.rows[0]}, "successfull")
        )
    } catch (error) {
        res.status(501).json(
            new ApiResponse(501, "Turf not found", "Failed")
        )
    }
});

const deleteTurfbyId = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM turfs WHERE id = $1 RETURNING *;", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Turf not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, result.rows[0], "Turf deleted successfully")
        );
    } catch (error) {
        console.error("Error deleting turf:", error);

        return res.status(500).json(
            new ApiError(500, "Could not delete the turf", "Failed")
        );
    }
});

export { getAllTurfs, getTurfById, deleteTurfbyId };