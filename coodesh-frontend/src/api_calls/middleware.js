

const request = async (endpoint) => {
    // TODO: Importar corretamente o path const path = require('path')
    const BASE_URL = "http://localhost:3000/" // TODO: colocar variável no env
    const req_url = BASE_URL + endpoint
    const resp = await fetch(req_url)
    return await resp.json()
}

export default request