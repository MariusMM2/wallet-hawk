export interface ValidationError {
    value?: string;
    msg: string;
    param: string;
    location: string;
}
