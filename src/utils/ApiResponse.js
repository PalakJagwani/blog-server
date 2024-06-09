class ApiResponse{
    //as it is an api response --> most of the time mssg will be a success mssg only
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message
    }
}

export {ApiResponse}