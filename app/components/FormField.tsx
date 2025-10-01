type Props = {
    field: string
}

const FormField = ({ field }: Props) => {

    const name = field[0].toUpperCase() + field.slice(1);

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium">{name}</label>
            <input
                name={field}
                className="rounded-xl border border-gray-200 px-6 py-3"
                placeholder={name}
                required
            />
        </div>
    );
}

export default FormField