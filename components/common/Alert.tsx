import { twMerge } from "tailwind-merge";

export type AlertVariants = ""|"primary"|"success"|"error";

interface Props {
    [prop: string]: any;
    children: React.ReactNode;
    variant?: AlertVariants;
}

const Alert = ({variant="primary", className, children, ...props}: Props): JSX.Element => {
    const getVariant = () => {
        switch(variant) {
            case "primary":
                return "bg-slate-100 text-slate-700"
            case "success":
                return "bg-green-100 text-green-700"
            case "error":
                return "bg-red-100 text-red-700"
            default:
                return "bg-slate-100 text-slate-700"
        }
    }

    const classes = twMerge(`text-left rounded-lg py-2 px-4 mb-4 text-base mb-3 ${getVariant()} ${className ?? ""}`);

    return <div {...props} className={classes} role="alert">{children}</div>; 
}

export default Alert;