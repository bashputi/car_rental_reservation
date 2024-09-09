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

const getAllOrders = catchAsync(async (req, res) => {
    const result = await BookedService.getAllBookedFromDB();
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrived successfully",
        data: result,
    });
});

const getMyOrder = catchAsync(async (req, res) => {
    const { email } = req.user;
    const result = await BookedService.getMyBookedFromDB(email);
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My bookings retrived successfully",
        data: result,
    });
})

const getSingleOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookedService.getSingleBookedFromDB(id);
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cars retrived successfully",
        data: result,
    });
});



const returnBooked = catchAsync(async (req, res) => {
    const { bookingId: id } = req.body;
    const result = await BookedService.returnBookedIntoDB(id, req.body);
    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Car returned successfully",
        data: result,
    });
})


export const BookedController = {
    newBooked,
    getAllOrders,
    getSingleOrder,
    getMyOrder,
    returnBooked,
}