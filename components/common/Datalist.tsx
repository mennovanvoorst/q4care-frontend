import { useState } from "react";
import { twMerge } from "tailwind-merge";
import OutsideClickHandler from 'react-outside-click-handler';

interface Props {
    [prop: string]: any;
    label?: string;
    placeholder?: string;
    options: {
        value: string;
        label: string;
    }[]
    onSelect: (option: any) => void;
}

const Datalist = ({options, label, className, error, placeholder = "", onSelect, ...props}: Props): JSX.Element => {
    const [open, setOpen] = useState(false); 
    const [value, setValue] = useState(""); 

    let classes = twMerge(`w-full px-4 py-2 bg-slate-700 text-white border-0 rounded ${className ?? ""}`);

    if(error) classes = twMerge(`${classes} border-2 border-red-500`);

    const renderOptions = () => options.filter(option => option.label.toLowerCase().includes(value.toLowerCase())).map(option => <li key={option.value} className="py-2 px-4 cursor-pointer hover:bg-slate-600" onClick={(e) => handleSelect(e, option)}>{option.label}</li>)
    const handleInputChange = (e) => setValue(e.target.value);

    const handleSelect = (e, option: any) => {
        onSelect(option);
        setOpen(false);
        setValue("");
    }
    return (
        <p className="text-left">
            {label && <label className="mb-2 block font-medium">{label}</label>}
            <OutsideClickHandler
                onOutsideClick={() => setOpen(false)}
            >
                <div className="relative" onFocus={() => setOpen(true)}>
                    <input className={classes} placeholder={placeholder} onChange={handleInputChange} value={value} {...props} aria-invalid={error ? "true" : "false"} />
                    <ul className={`absolute max-h-48 overflow-y-scroll w-full bg-slate-700 rounded mt-4 ${!open && "hidden"}`}>
                        { renderOptions() }
                    </ul>
                </div>
            </OutsideClickHandler>
            { error && <span className="block text-red-500 font-medium mt-2">{error}</span>}
        </p>
    )
}

export default Datalist;