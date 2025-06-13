import { AppDataSource } from "./database";
import { UserCreate, UserLogin, } from "./dto";
import { User } from "./user";
import bcrypt from 'bcrypt'
import { HASH_SALT } from "./config";
import { sign } from 'jsonwebtoken'

const repository = AppDataSource.getRepository(User)

export class UserRepository {

    static async create(user: UserCreate | UserCreate[]) {

        let users2Create = []

        for (let u of !Array.isArray(user) ? [user] : user) {
            console.log(u.password);

            u.password = await bcrypt.hash(u.password, 10)
            users2Create.push(repository.create(u))
        }

        const newUser = await repository.save(users2Create)
        return newUser.map(({ id }) => id)
    }

    static async login({ email, password }: UserLogin) {
        const user = await repository.findOne({ where: { email } })
        if (!user) {
            throw new Error('User not found!')
        }
        console.log(password);
        console.log(user.password);

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            throw new Error('Password not valid!')
        }

        return await sign({ id: user.id }, 'grandetuco1', {
            encoding: 'utf-8',
            expiresIn: 60 * 60
        })
    }

}