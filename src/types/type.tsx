import {z} from 'zod'

export const signInSchema = z.object({
     email : z.string().email().min(1),
     password : z.string().min(6)
})

export const signUpSchema = z.object({
     name : z.string().min(2),
     email : z.string().email().min(1),
     password : z.string().min(6)
})