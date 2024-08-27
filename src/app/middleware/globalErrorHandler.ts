import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interfase/error";
import { ZodError } from "zod";
import handleZodError from "../Error/handleZodError";
import handleValidationError from "../Error/handleValidationError";
import handleCastError from "../Error/handleCastError";
import handleDuplicateError from "../Error/HandleDuplicateError";
import AppError from "../Error/AppError";
import config from "../config";



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err || "Something was wrong";

    let errorSource: TErrorSources = [
        {
            path: "",
            message: "Something was wrong",
        }
    ]

    if (err instanceof ZodError) {
        const simplefeidError = handleZodError(err);
        message = simplefeidError?.message;
        statusCode = simplefeidError?.statusCode;
        errorSource = simplefeidError?.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplefeidError = handleValidationError(err);
        message = simplefeidError?.message;
        statusCode = simplefeidError?.statusCode;
        errorSource = simplefeidError?.errorSources;
    }
     else if (err?.name === "CastError") {
        const simplefeidError = handleCastError(err);
        message = simplefeidError?.message;
        statusCode = simplefeidError?.statusCode;
        errorSource = simplefeidError?.errorSources;
    }
     else if (err?.name === 11000) {
        const simplefeidError =  handleDuplicateError(err);
        message = simplefeidError?.message;
        statusCode = simplefeidError?.statusCode;
        errorSource = simplefeidError?.errorSources;
    }
     else if (err instanceof AppError) {
        message = err?.message;
        statusCode = err?.statusCode;
        errorSource = [{ path: "", message: err?.message }];
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorSource = [{ path: "", message: err?.message }];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,

        stack: config.NODE_ENV == "development" ? err.stack : null,
    })

};

export default globalErrorHandler;