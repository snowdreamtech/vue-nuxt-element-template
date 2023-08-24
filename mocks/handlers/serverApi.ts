
const baseurl = "http://localhost:8080"

const serverApi = (path :string) => {
    return new URL(path,  baseurl).toString()
}

export default serverApi