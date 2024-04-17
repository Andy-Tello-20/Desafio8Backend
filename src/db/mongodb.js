

import mongoose from "mongoose"

const URI = 'mongodb+srv://andrest911:M3gPtTin1bfuAeSR@cluster0.nakuen6.mongodb.net/cookies?retryWrites=true'

export const init =async () => {
    try {
        await mongoose.connect(URI)
        console.log('Database connected successfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarse',error.message)
    }
}