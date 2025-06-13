import z from 'zod'

export const Create = z.object({
    firstName: z.string().min(3).nonempty(),
    lastName: z.string().min(3).nonempty(),
    password: z.string().min(8).nonempty(),
    email: z.string().email().nonempty(),
})

export const Login = z.object({
    password: z.string().min(8).nonempty(),
    email: z.string().email().nonempty(),
})


export type UserCreate = z.infer<typeof Create>
export type UserLogin = z.infer<typeof Login>

export const validateZod = async <TZodType extends z.ZodTypeAny>(schema: TZodType, data: z.infer<TZodType>) => await schema.safeParseAsync(data, { async: true }) as z.SafeParseReturnType<TZodType, z.infer<TZodType>>

