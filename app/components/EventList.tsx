import type { TCity, TEvent } from "~/definitions/types";

type Props = {
    events: Array<TEvent>
    selectedCities: Array<TCity>
}

const EventList = ({ events, selectedCities }: Props) => {

    const filteredEvents =
        selectedCities.length === 0
            ? events
            : events.filter(event =>
                event.cities.some(city =>
                    selectedCities.some(selected =>
                        selected.name === city
                    )
                )
            )

    return (
        <div className="grid grid-cols-3 gap-4">
            {filteredEvents?.map((event, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-gray-200 p-6"
                >
                    <p>{event.id}</p>
                    <h3>{event.title}</h3>
                    <p>{event.category}</p>
                    <p>{event.description}</p>
                    <p>{event.duration}</p>
                    {event.cities.map((city, index) => (
                        <p key={index}>{city}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default EventList