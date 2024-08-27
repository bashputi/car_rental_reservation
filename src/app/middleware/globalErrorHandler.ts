import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interfase/error";






const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err || "Something was wrong";

    let errorSource: TErrorSources = [
        {
            path: "",
            message: "Something was wrong",
        }
    ]

    
}