import jwt from 'jsonwebtoken'

const accessTokenGenerator = (obj) => {
    return jwt.sign({
        id : obj.id,
        fullName : obj.fullName,
        username : obj.username,
        email : obj.email,
        phone_no : obj.phone_no
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

const refreshTokenGenerator = (obj) => {
    return jwt.sign({
        id : obj.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export { accessTokenGenerator, refreshTokenGenerator }