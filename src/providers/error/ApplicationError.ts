import { AllErrorCodes, ErrorType, GeneralErrorCode } from "./ErrorTypes";

class ApplicationError extends Error {
    private errorType: ErrorType = GeneralErrorCode.UNKNOWN;

    constructor(errorType: ErrorType, errorMessage?: string) {
        super(errorMessage);

        if (errorMessage === undefined) {
            this.ParseErrorType(errorType);
        }
        else {
            this.errorType = errorType;
            this.message = errorMessage;
        }
    }

    public get Message(): string {
        return this.message;
    }

    public get ErrorType(): ErrorType {
        return this.errorType;
    }

    private ParseErrorType(errorType: ErrorType): void {
        const errorTypeListIds = Object.keys(AllErrorCodes).filter(key => !isNaN(Number(key)));
        const errorTypeListNames = Object.keys(AllErrorCodes).filter(key => isNaN(Number(key)));

        for (let i = 0; i < errorTypeListIds.length; i++) {
            if (Number(errorTypeListIds[i]) === errorType) {
                this.errorType = errorType;
                this.message = errorTypeListNames[i].split(/(?=[A-Z])/).join(" ");
            }
        }
    }
}

export { ApplicationError };