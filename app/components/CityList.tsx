import type { TCity } from "~/definitions/types";

type Props = {
    cities: Array<TCity>
}

const CityList = ({ cities }: Props) => {

    return (
        <div className="grid grid-cols-3 gap-4">
            {cities?.map((city, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-gray-200 p-6"
                >
                    <p>{city.id}</p>
                    <h3>{city.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default CityList