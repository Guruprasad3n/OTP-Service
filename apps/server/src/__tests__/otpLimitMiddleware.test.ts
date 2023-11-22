// __tests__/otpLimitMiddleware.test.ts

import { Request, Response, NextFunction } from "express";
import otpLimitMiddleware from "../middlewares/otpLimitMiddleware";
// import rateLimit from "express-rate-limit";
import rateLimit, { RateLimitRequestHandler, Options, ClientRateLimitInfo } from "express-rate-limit";

jest.mock("express-rate-limit");


// const mockedRateLimit = rateLimit as jest.MockedFunction<
//   (passedOptions?: Partial<Options>) => RateLimitRequestHandler
// >;
const mockedRateLimit = rateLimit as jest.MockedFunction<any>;

// const mockedRateLimit = rateLimit as jest.MockedFunction<
//   (options?: Partial<Options>) => RateLimitRequestHandler & {
//     resetKey: (key: string) => void;
//     getKey: (key: string) => ClientRateLimitInfo | Promise<ClientRateLimitInfo>;
//   }
// >;
describe("otpLimitMiddleware", () => {
  it("should call rate limit middleware and pass to the next middleware", () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    otpLimitMiddleware(req, res, next);

    expect(rateLimit).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should handle rate limit exceeded", () => {
    const req = {} as Request;
    const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    // Simulate rate limit exceeded scenario
    // rateLimit.mockImplementation(
    //   () => (req: Request, res: Response, next: NextFunction) => {
    //     res.status(429).send({ success: false, error: "Rate limit exceeded" });
    //   }
    // );

    mockedRateLimit.mockImplementation((options?: Partial<Options>) => {
        return (req: Request, res: Response, next: NextFunction) => {
          res.status(429).send({ success: false, error: 'Rate limit exceeded' });
        };
      });

    // mockedRateLimit.mockImplementation((options?: Partial<Options>) => {
    //     return (req: Request, res: Response, next: NextFunction) => {
    //       res.status(429).send({ success: false, error: 'Rate limit exceeded' });
    //     };
    //   });
    otpLimitMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
    expect(next).not.toHaveBeenCalled();
  });

  // Add more test cases for other scenarios
});
