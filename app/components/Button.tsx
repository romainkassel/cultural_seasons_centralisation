type Props = {
    text: string
}

const Button = ({ text }: Props) => {
    return (
        <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-white"
        >
            {text}
        </button>
    );
}

export default Button