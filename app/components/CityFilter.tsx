import { useEffect, useState } from "react";
import { serverURL } from "~/constants/constants";
import type { TCity, TFilters } from "~/definitions/types";
import Example from "./Example";

type Props = {
    selectedCities: Array<TCity>
    setSelectedCities: (selectedCities: Array<TCity>) => void
}

const CityFilter = ({ selectedCities, setSelectedCities }: Props) => {

    const [cities, setCities] = useState<Array<TCity>>();
        
    useEffect(() => {
        fetch(`${serverURL}/cities`)
        .then(response => response.json())
        .then(cities => setCities(cities))
    }, [])

    console.log("cities: ", cities);

    return (
        <>
            {cities
                ? <Example 
                    cities={cities}
                    selectedCities={selectedCities}
                    setSelectedCities={setSelectedCities}
                  />
                : <p>No cities</p>}
        </>
    );
}

export default CityFilter