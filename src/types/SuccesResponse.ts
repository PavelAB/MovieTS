export interface SuccessResponse<T>{
    data: T,
    totalCount: number,
    currentPage: number,
    totalPages: number
}

export interface SuccessResponseMsg{
    code: number,
    msg: string
}