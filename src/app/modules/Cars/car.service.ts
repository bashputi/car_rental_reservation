
import { TCar } from "./car.interfase";
import { Car } from "./car.model";
import httpStatus from 'http-status';
import AppError from '../../Error/AppError';


const createCar = async (payload: TCar) => {
    const result = await Car.create(payload);
    return result;
};

const GetAllCar = async () => {
    const result = await Car.find();
    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }
    return result;
};

const getSingleCar = async (id: string) => {
    const result = await Car.findById(id);
    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }
    return result;
};

const updateCar = async (id: string, payload: Partial<TCar>) => {
    const result = await Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }
    return result;
};

const deleteCar = async (id: string, payload: Partial<TCar>) => {
    const result = await Car.findByIdAndDelete(id, {
        isDelete: true,
        new: true,
        runValidators: true,
    });
    return result;
}

export const CarService = {
    createCar,
    GetAllCar,
    getSingleCar,
    updateCar,
    deleteCar
}