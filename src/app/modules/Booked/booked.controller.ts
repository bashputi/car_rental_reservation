import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { BookedService } from "./book.service";


const newBooked = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await BookedService.newBookedIntoDB(user, req.body);
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car booked successfully",
        data: result,
    });
});

const getAllOrder


export const BookedController = {
    newBooked,
}