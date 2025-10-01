import { eventCreationFields, serverURL } from "~/constants/constants";
import type { TEvent } from "~/definitions/types";
import Button from "./Button";
import FormField from "./FormField";

type Props = {
    events: Array<TEvent>
    setEvents: (events: Array<TEvent>) => void;
}

const EventCreation = ({ events, setEvents }: Props) => {

    function createEvent(formData) {

        const event = {
            title: formData.get("title"),
            category: formData.get("category"),
            description: formData.get("description"),
            duration: formData.get("duration"),
            city: formData.get("city")
        }

        fetch(`${serverURL}/event`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
        .then(Response => Response.json())
        .then(event => setEvents([...events, event]))
    }

    return (
        <form
            action={createEvent}
            className="grid grid-cols-3 gap-4"
        >
            {eventCreationFields.map((field, index) =>
                <FormField
                    key={index}
                    field={field}
                />
            )}
            <Button
                text="Create event"
            />
        </form>
    );
}

export default EventCreation