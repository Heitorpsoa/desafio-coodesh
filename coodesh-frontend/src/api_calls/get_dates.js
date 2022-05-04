import request from './middleware'

const getAvailableDates = async () => {
    const dates = await request("dates")
    return dates
}

export default getAvailableDates