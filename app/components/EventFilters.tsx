import type { TCity, TFilters } from "~/definitions/types";
import CityFilter from "./CityFilter";

type Props = {
    selectedCities: Array<TCity>
    setSelectedCities: (selectedCities: Array<TCity>) => void
}

const EventFilters = ({ selectedCities, setSelectedCities }: Props) => {

    return (
        <div className="grid grid-cols-3 gap-4">
            <CityFilter
                selectedCities={selectedCities}
                setSelectedCities={setSelectedCities}
            />
        </div>
    );
}

export default EventFilters