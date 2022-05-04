import request from "./middleware"

const getCasesByDate = async (date) => {
    console.log('Chame aqui')
    const covidCases = await request(`cases/${date}/cumulative`)
    const variants = []
    const locations = []

    const formattedData = [["Country"]]

    let variantPointer = 1
    let locationPointer = 1

    for (let covidCase of covidCases) {

        let currentVariantIndex = null
        let currentLocationIndex = null

        // Se a variante foi adicionada ainda
        const matchedVariants = variants.filter(variant => variant.name == covidCase._id.variant)
        if (matchedVariants.length == 0) {

            // Adiciona ela às possíveis variantes
            variants.push({ name: covidCase._id.variant, index: variantPointer })
            currentVariantIndex = variantPointer
            variantPointer += 1

        } else {
            currentVariantIndex = matchedVariants[0].index
        }

        // Se o país não foi adicionado ainda
        const matchedCountries = locations.filter(location => location.name == covidCase._id.location)
        if (matchedCountries.length == 0) {
            // Adiciona ele aos possíveis países
            locations.push({ name: covidCase._id.location, index: locationPointer })
            currentLocationIndex = locationPointer
            locationPointer += 1
        } else {
            currentLocationIndex = matchedCountries[0].index
        }

        // Adicionando variante no lugar dela da tabela
        formattedData[0][currentVariantIndex] = covidCase._id.variant || "erro"

        // Adicionando o país
        try {
            formattedData[currentLocationIndex][currentVariantIndex] = covidCase.sum
        } catch (ex) {
            formattedData[currentLocationIndex] = []
            formattedData[currentLocationIndex][0] = covidCase._id.location || "erro"
            formattedData[currentLocationIndex][currentVariantIndex] = covidCase.sum
        }

    }
    console.log('Vou retornar isso')
    console.table(formattedData)

    // vai vir
    // [{_id: {location, variant}, sum: 3}]
    // [location, variantName1, variantName2]
    // [brazil, 0, 2,]
    return formattedData
}

export default getCasesByDate