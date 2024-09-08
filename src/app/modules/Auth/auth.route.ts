import { Router } from "express";
import validationRequest from "../../middleware/validationRequest";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "./auth.validation";


const router = Router();
router.post(
    "/signup",
    validationRequest(UserValidation.createUserValidationSchema),
    AuthControllers.registerUser
);
router.post("/signin", AuthControllers.userLogin);
// router.post("/forget_password", AuthControllers.userForgetPassword);
// router.post("/reset_password", AuthControllers.userResetPassword);

export const AuthRoute = router;