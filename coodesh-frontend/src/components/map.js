import { useEffect, useState } from "react"
import { Chart } from 'react-google-charts'
import getCasesByDate from "../api_calls/get_cases_by_date"

export default function CovidCasesMap(props) {

    const [countryData, setCountryData] = useState([['Country']])

    const refreshData = async () => {
        if (!props?.selectedDate)
            return
        getCasesByDate(props.selectedDate).then(data => setCountryData(data))

    }

    useEffect(() => { refreshData() }, [props.selectedDate])

    return (
        <Chart
            height={'60vh'}
            width={'80vw'}
            chartType='GeoChart'
            data={countryData}

            mapsApiKey="AIzaSyBxwO9jIZoFy5iIrlbzpKElQg1BG5EsUO0"
        />
    )
}
