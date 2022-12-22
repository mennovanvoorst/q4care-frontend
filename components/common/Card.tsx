import { twMerge } from "tailwind-merge";
import Heading from "./Heading";

export type AlertVariants = ""|"primary"|"success"|"error";

interface Props {
    [prop: string]: any;
    children: React.ReactNode;
    title?: string;
}

const Card = ({title, className, children, ...props}: Props): JSX.Element => {
    const classes = twMerge(`w-full text-left rounded-lg p-4 mb-4 text-base mb-3 bg-slate-700 ${className ?? ""}`);

    return <div {...props} className={classes} role="alert">
        {title && <Heading as="h3">{title}</Heading>}
        <p>
            {children}
        </p>
    </div>; 
}

export default Card;