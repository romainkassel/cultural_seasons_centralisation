import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import type { TCity, TFilters } from '~/definitions/types'

type Props = {
  cities: Array<TCity>
  selectedCities: Array<TCity>
  setSelectedCities: (selectedCities: Array<TCity>) => void
}

export default function Example({ cities, selectedCities, setSelectedCities }: Props) {

  const [query, setQuery] = useState('')

  const filteredCities =
    query === ''
      ? cities
      : cities.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase())
        })

  const getValueToDisplay = () => {

    let valueToDisplay = "";

    selectedCities.map((city) => (
      valueToDisplay += `${city.name}, `
    ))

    if (valueToDisplay.length === 0)
    {
      return ("Aucune ville sélectionnée");
    }
    
    return valueToDisplay.slice(0, valueToDisplay.length - 2);

  }

  return (
    <Combobox multiple value={selectedCities} onChange={(value) => setSelectedCities(value)} onClose={() => setQuery('')}>
      <div className="relative">
        <ComboboxInput
          className={clsx(
            'w-full rounded-lg border-none bg-black/5 py-1.5 pr-8 pl-3 text-sm/6 text-black',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-black/25'
          )}
          displayValue={() => getValueToDisplay()}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-black/60 group-data-hover:fill-black" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-(--input-width) rounded-xl border border-black/5 bg-gray-100 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
          'transition duration-100 ease-in data-leave:data-closed:opacity-0'
        )}
      >
        {filteredCities.map((city, index) => (
          <ComboboxOption
            key={index}
            value={city}
            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-black/10"
          >
            <CheckIcon className="invisible size-4 fill-black group-data-selectedCities:visible" />
            <div className="text-sm/6 text-black">{city.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}