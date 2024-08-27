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


export const AuthControllers = {
    registerUser,
}