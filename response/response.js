class Response {
    constructor(code, message, res, error) {
        this.code = code;
        this.message = message;
        this.res = res;
        this.error = error
      }

    res_message(){
        return this.res
            .send({
                error: this.error,
                code: this.code,
                message: this.message
            })
    }
}

module.exports = Response;