import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: CustomError | unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const message =
        err instanceof Error ? err.message : "Server Error";

    const statusCode =
        err instanceof Object && "statusCode" in (err as any)
            ? (err as any).statusCode
            : 500;

    console.error("❌ Error:", message);

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};
