import pool from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { passwordHasher } from "../utils/hashWorks.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/accessRefressTokenGenerator.js";


const userRegister = asyncHandler(async (req, res) => {
    const {fullName, username, email, phone_no, password} = req.body;

    // checking for non-empty input
    if (
        [fullName, username, email, phone_no, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(
            new ApiResponse(400, "All fields are required")
        )
    }

    // checking for existing user
    const existedUser = await pool.query('select * from Users where username = $1 or email = $2 or phone_no = $3;', [username, email, phone_no]);
    if (existedUser.rowCount) {
        return res.status(409).json(
            new ApiResponse(409, "User with given username or email or phone number already exists.")
        )
    }
    const hashedPassword = await passwordHasher(password);
    // inserting new user to database
    const insertUserQuery = {
        text : 'INSERT INTO Users (fullName, username, email, phone_no, password) values ($1, $2, $3, $4, $5) returning id, fullName, username, email, phone_no, createdAt;',
        values : [fullName, username, email, phone_no, hashedPassword]
    }
    const newUser = await pool.query(insertUserQuery);
    

    if (!newUser.rowCount){
        return res.status(500).json(
            new ApiResponse(500, 'Cannot insert data to database.')
        )
    }

    return res.status(200).json(
        new ApiResponse(200, newUser.rows[0], "User registered successfully.")
    );
})

const userLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Email and password are required",
                success: false
            });
        }

        const validUser = await pool.query("SELECT id, fullName, username, email, phone_no, password, createdAt FROM users WHERE email = $1;", [email]);

        if (validUser.rowCount === 0) {
            return res.status(401).json({
                status: 401,
                message: "Invalid User Credentials",
                success: false
            });
        }

        const hashedPassword = validUser.rows[0].password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 401,
                message: "Invalid User Credentials",
                success: false
            });
        }

        const accessToken = accessTokenGenerator(validUser.rows[0]);
        const refreshToken = refreshTokenGenerator(validUser.rows[0]);

        await pool.query('UPDATE users SET refreshToken = $1 WHERE id = $2;', [refreshToken, validUser.rows[0].id]);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {
                    user: validUser.rows[0], accessToken, refreshToken
                }, "User logged in successfully.")
            );
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: 400,
            message: "User Login Failed",
            success: false
        });
    }
});


const userLogout = asyncHandler(async(req, res) => {
     // const { user } = req.user;
     const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // obtaining old refresh token from the cookies
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
        throw new ApiError(401, "Refresh Token not found.")
    }

    try {
        const decodedToken = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await pool.query('select * from users where id = $1', [decodedToken.id]);

        if (!user.rowCount) {
            throw new ApiError(401, 'invalid refresh token');
        }


        if (oldRefreshToken !== user.rows[0].refreshtoken){
            throw new ApiError(401, "refresh token is invalid or expired")
        }


        const options = {
            httpOnly: true,
            secure: true
        }

        // generating new access and refresh token
        const accessToken = accessTokenGenerator(user.rows[0]);
        const refreshToken = refreshTokenGenerator(user.rows[0]); 

        // updating refresh token in the database
        await pool.query('update users set refreshToken = $1 where id = $2;', [refreshToken, user.rows[0].id]);


        return res.status(200).cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new ApiResponse(200, {
                accessToken:accessToken, 
                refreshToken:refreshToken
            }, 'Access token refreshed successfully.')
        )

    } catch (err) {
        throw new ApiError(501, err.message)
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        return res
        .status(200)
        .json(new ApiResponse(200, {
            data : req.user
        }, "Current User successfully obtained."))
    } catch (error) {
        return res.status(500)
        .json(new ApiError(500, "Cannot Send Data of current user"))
    }
})

const editUserInfo = asyncHandler(async (req, res) => {
    const { fullName, username, phone_no, password } = req.body;
    const { id } = req.user;

    if ([fullName, username, phone_no].some((field) => field?.trim() === "")) {
        return res.status(400).json(
            new ApiError(400, "Full name, username, and phone number are required.")
        );
    }

    let hashedPassword;
    if (password) {
        hashedPassword = await passwordHasher(password);
    }

    const updateQuery = {
        text: `
            UPDATE Users 
            SET fullName = $1, username = $2, phone_no = $3${password ? ', password = $4' : ''} 
            WHERE id = $5 
            RETURNING id, fullName, username, email, phone_no, createdAt;
        `,
        values: password ? [fullName, username, phone_no, hashedPassword, id] : [fullName, username, phone_no, id]
    };

    try {
        const updatedUser = await pool.query(updateQuery);

        if (!updatedUser.rowCount) {
            return res.status(404).json(
                new ApiError(404, "User not found.")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, updatedUser.rows[0], "User information updated successfully.")
        );
    } catch (error) {
        console.error("Error updating user information:", error);

        return res.status(500).json(
            new ApiError(500, "Failed to update user information.")
        );
    }
});



export {
    userRegister,
    userLogin,
    userLogout,
    refreshAccessToken,
    getCurrentUser,
    editUserInfo
}