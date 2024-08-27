import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TUser} from "./auth.interfase";
import { User } from "./auth.model";


const register = async (payload: TUser) => {
    const user = await User.findOne({ email: payload.email });

    if(user) {
        throw new AppError(httpStatus.CONFLICT, "User already exists!");
    }
    payload.role = payload.role;
    const newuser = await User.create(payload);
    return newuser;
}

export const AuthService = {
    register,
    
}