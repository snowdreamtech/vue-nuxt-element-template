const baseurl = "http://localhost:8080"

const serverResponse = ( code :string = "SUCCESS", message : string = "", data :any = "") => {
    const response = {
        "version": "0.1",
        "code": code,
        "message": message,
        "data": data, 
        "timestamp": Date.now(),
    }

    return response
}

export default serverResponse