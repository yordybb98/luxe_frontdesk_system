type ValidationError = {
    code: string;
    keys: string[];
    path: string[];
    message: string;
};

type ErrorResponse = {
    message: ValidationError[];
};
