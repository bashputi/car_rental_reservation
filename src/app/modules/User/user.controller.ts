import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { UserService } from "./user.service";


const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);
    sendResponce(res, {
        statusCode: 201,
        success: true,
        message: "User Create successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
}