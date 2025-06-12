import { AppDataSource } from "./database";
import { UserCreate, } from "./dto";
import { User } from "./user";

const repository = AppDataSource.getRepository(User)

export class UserRepository {

    static async create(user: UserCreate | UserCreate[]) {

        let users2Create = []

        for (let u of !Array.isArray(user) ? [user] : user) {
            users2Create.push(repository.create(u))
        }

        const newUser = await repository.save(users2Create)
        return newUser.map(({id})=>id)
    }

}