export interface ErrorResponse{
    msg: string,
    statusCode: number
}

export interface ErrorValidator{
    msg: string,
    state: boolean
}