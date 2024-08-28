import mongoose from "mongoose";
import { User } from "../Auth/auth.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { Car } from "../Cars/car.model";
import { Booked } from "./book.model";




interface TBooked extends Document {
    cardId: mongoose.Types.ObjectId;
    user?: mongoose.Types.ObjectId;
    [key: string]: any;
};

const newBookedIntoDB = async (
    user: Record<string, unknown>,
    payload: TBooked
) => {
    const filterLoginUser = await User.findOne({ email: user.email });
    if(!filterLoginUser) {
        throw new AppError(httpStatus.NOT_FOUND, "user not Found");
    }
    const newuser = filterLoginUser._id;
    payload.user = newuser as mongoose.Types.ObjectId;

    const filterCar = await Car.findOne({ _id: payload.carTd });
    if(!filterCar) {
        throw new AppError(httpStatus.NOT_FOUND, "car not found");
    }

    const { _id } = filterCar;
    const statusUpdateCar = await Car.findByIdAndUpdate(
        _id,
        {
            new: true,
            runValidators: true,
        }
    );

    const result = (
        await (await Booked.create(payload)).populate("user")
    ).populate("carId");
    return result;
};



export const BookedService = {
    newBookedIntoDB,
    
};