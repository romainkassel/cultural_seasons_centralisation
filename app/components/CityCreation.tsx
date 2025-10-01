import { cityCreationFields, serverURL } from "~/constants/constants";
import type { TCity } from "~/definitions/types";
import Button from "./Button";
import FormField from "./FormField";

type Props = {
    cities: Array<TCity>
    setCities: (events: Array<TCity>) => void;
}

const CityCreation = ({ cities, setCities }: Props) => {

    function createCity(formData) {

        const city = {
            id: null,
            name: formData.get("name"),
        }

        fetch(`${serverURL}/city`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(city),
        })
        .then(Response => Response.json())
        .then(city => setCities([...cities, city]))
    }

    return (
        <form
            action={createCity}
            className="grid grid-cols-3 gap-4"
        >
            {cityCreationFields.map((field, index) =>
                <FormField
                    key={index}
                    field={field}
                />
            )}
            <Button
                text="Create city"
            />
        </form>
    );
}

export default CityCreation