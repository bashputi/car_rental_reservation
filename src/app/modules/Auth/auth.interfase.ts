import { Model } from "mongoose";
import { user_role } from "./auth.constant";





export type TUserLogin = {
    email: string;
    password: string;
};

export type Tuser_role = keyof typeof user_role;

export interface TUser {
    name: string;
    email: string;
    role: Tuser_role;
    password: string;
    phone: string;
    address: string;
}

export interface TUserDocument extends TUser, Document {}

export interface userModel extends Model<TUserDocument> {
    isUserExistByCustomerId(email: string): Promise<TUserDocument>;
    isPasswordMatch(
        plainTextPassword: string,
        hashTexPassword: string
    ): Promise<boolean>;
}