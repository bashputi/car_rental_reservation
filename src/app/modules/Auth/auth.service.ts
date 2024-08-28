import { accesstoken } from './auth.utlils';
import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TUser, TUserLogin} from "./auth.interfase";
import { User } from "./auth.model";
import config from '../../config';


const register = async (payload: TUser) => {
    const user = await User.findOne({ email: payload.email });

    if(user) {
        throw new AppError(httpStatus.CONFLICT, "User already exists!");
    }
    payload.role = payload.role;
    const newuser = await User.create(payload);
    return newuser;
}

const loginUser = async (payload: TUserLogin) => {
    const user = await User.isUserExistByCustomerId(payload.email);
  
    // const isUserExists = await User.findOne({ email: payload.email }).select(
    //   "password"
    // );
    // console.log(user);
    if (!user) {
      throw new AppError(httpStatus.NOT_EXTENDED, "This User not found");
    }
    if (!(await User.isPasswordMatched(payload.password, user.password))) {
      throw new AppError(httpStatus.FORBIDDEN, "wrong password !");
    }
  
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = accesstoken(
        jwtPayload,
        config.jwt_access_token as string,
        "7d"
    );
    const token = `${accessToken}`;

    const accessRefreshToken = accesstoken(
        jwtPayload,
        config.jwt_refresh_token as string,
        "1y"
    );

    return {
        token,
        accessRefreshToken,
        user
    };
};

export const AuthService = {
    register,
    loginUser
}