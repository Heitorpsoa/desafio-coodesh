import { useEffect, useState } from "react"
import covidCasesMap from "../components/map"
import getAvailableDates from '../api_calls/get_dates'

const MapPage = () => {

    const [selectedDate, setSelectedDate] = useState('')
    const [currentDateIndex, setCurrentDateSliderIndex] = useState(0)
    const [dates, setAvailableDates] = useState([])

    const handleSliderMove = (e) => { setCurrentDateSliderIndex(e.target.value) }
    const handleSliderUp = (e) => { setSelectedDate(dates[e.target.value]) }

    // Buscando datas disponíveis assim que a página é iniciada
    // TODO: Colocar loader enquanto a request é feita
    useEffect(() => { getAvailableDates().then(dates => setAvailableDates(dates)) }, [])

    return (
        <>
            <div className="container">
                <h2> Casos Diários Covid-19 </h2>
                <h2> {dates[currentDateIndex]} </h2>
                <input type="range" min={0} max={dates.length} defaultValue={currentDateIndex} onChange={handleSliderUp} />
                {covidCasesMap({ selectedDate: selectedDate })}
            </div>
        </>
    )
}
export default MapPage