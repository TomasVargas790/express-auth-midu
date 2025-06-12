import z, { ZodTypeAny } from 'zod'

export const Create = z.object({
    firstName: z.string().min(3).nonempty(),
    lastName: z.string().min(3).nonempty(),
    password: z.string().min(8).nonempty(),
    email: z.string().email().nonempty(),
})
export type UserCreate = z.infer<typeof Create>

export const validateZod = async <TZodType extends z.ZodTypeAny>(schema: TZodType, data: z.infer<ZodTypeAny>) => {
    return schema.safeParseAsync(data, { async: true })
}

