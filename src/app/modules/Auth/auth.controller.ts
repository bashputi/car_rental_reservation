import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { AuthService } from "./auth.service";



const registerUser = catchAsync(async (req, res) => {
    const result = await AuthService.register(req.body);
    sendResponce(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully!",
        data: result,
    })
});

const userLogin = catchAsync(async (req, res) => {
    const { accessRefreshToken, token, user } = await AuthService.loginUser(
        req.body
    );

    res.cookie("refreshToken", accessRefreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
    });

    sendResponce(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: { user, token },
    });
});


export const AuthControllers = {
    registerUser,
    userLogin,
}