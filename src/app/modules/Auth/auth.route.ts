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

export const AuthRoute = router;