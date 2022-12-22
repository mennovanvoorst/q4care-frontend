import { twMerge } from "tailwind-merge";

interface Props {
    [prop: string]: any;
    label?: string;
    options: {
        value: string;
        label: string;
    }[]
}

const Select = ({options, label, className, register, error, ...props}: Props): JSX.Element => { 
    let classes = twMerge(`w-full px-4 py-2 bg-slate-700 text-white border-0 rounded ${className ?? ""}`);

    if(error) classes = twMerge(`${classes} border-2 border-red-500`);

    const renderOptions = () => options.map(option => <option value={option.value}>{option.label}</option>)

    return (
        <p className="text-left">
            {label && <label className="mb-2 block font-medium">{label}</label>}
            <select className={classes} {...register} {...props} aria-invalid={error ? "true" : "false"}>
                { renderOptions() }
            </select>
            { error && <span className="block text-red-500 font-medium mt-2">{error}</span>}
        </p>
    )
}

export default Select;