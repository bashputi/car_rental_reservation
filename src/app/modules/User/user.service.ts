import { TUser } from "./user.interfase";
import { User } from "./user.model";


const createUser = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

export const UserService = {
    createUser,
}