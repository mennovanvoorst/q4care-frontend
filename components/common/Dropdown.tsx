import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoCaretDown } from "react-icons/io5"
import Button from "./Button";
import Link from "next/link";

type buttonSizes = "sm"|"md"|"lg";
type buttonVariants = "primary"|"secondary";

interface Props {
    [prop: string]: any;
    children: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    size?: buttonSizes;
    variant?: buttonVariants;
    loading?: boolean;
    disabled?: boolean;
    items: { label: string; destination: string; }[];
}

const Dropdown = ({variant = "primary", size = "md", items = [], className, children, ...props}: Props): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);

    const classes = twMerge(`h-full ${className ?? ""}`);
    const iconClasses = open ? "rotate-180" : "rotate-0";

    const dropdownItems = items.map(item => <li key={item.label}><Link href={item.destination}><Button variant="secondary" fullWidth rounded>{item.label}</Button></Link></li>);

    return <div {...props} className={classes}>
        <Button variant={variant} size={size} onClick={handleToggle} endIcon={<IoCaretDown className={`transition duration-300 ease-in-out ${iconClasses}`} />} rounded>{ children }</Button>
        <div className={`w-full bg-slate-600 mt-2 rounded p-2 ${!open && "hidden"}`}>
            <ul className="w-full flex flex-col gap-y-4">{dropdownItems}</ul>
        </div>
    </div>; 
}

export default Dropdown;