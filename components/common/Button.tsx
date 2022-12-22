import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type buttonSizes = "sm"|"md"|"lg";
type buttonVariants = "primary"|"secondary"|"transparent";

interface Props {
    [prop: string]: any;
    children: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    size?: buttonSizes;
    variant?: buttonVariants;
    loading?: boolean;
    disabled?: boolean;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
}

const Button = ({loading = false, disabled = false, fullWidth = false, rounded = false, endIcon = null, startIcon = null, size = "md", variant="primary", className, children, ...props}: Props): JSX.Element => {
    const getFullWidth = () => fullWidth ? "w-full" : "";
    const getRounded = () => rounded ? "rounded" : "";

    const getSize = () => {
        switch(size) {
            case "sm":
                return "px-3 py-2 text-xs"
            case "md":
                return "px-4 py-2 text-md"
            case "lg":
                return "px-6 py-4 text-md"
        }
    }

    const getVariant = () => {
        switch(variant) {
            case "primary":
                return "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800 disabled:bg-red-600"
            case "secondary":
                return "bg-slate-600 text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800 disabled:bg-slate-600"
            case "transparent":
                return "bg-transparent text-white hover:bg-slate-600 focus:bg-slate-600 active:bg-slate-500 disabled:bg-slate-600";
        }
    }

    const showStartIcon = () => {
        if(!startIcon ) return;

        switch(size) {
            case "sm":
                return <span className="mr-1 h-2">{ startIcon }</span>;
            case "md":
                return <span className="mr-2 h-4">{ startIcon }</span>;
            case "lg":
                return <span className="mr-3 h-5">{ startIcon }</span>;
        }
    }

    const showEndIcon = () => {
        if(!endIcon ) return;

        switch(size) {
            case "sm":
                return <span className="ml-1 h-2">{ endIcon }</span>;
            case "md":
                return <span className="ml-2 h-4">{ endIcon }</span>;
            case "lg":
                return <span className="ml-3 h-5">{ endIcon }</span>;
        }
    }

    const showSpinner = () => {
        if(!loading ) return;

        
        switch(size) {
            case "sm":
                return <Spinner size="xs" />;
            case "md":
                return <Spinner size="sm" />;
            case "lg":
                return <Spinner size="md" />;
        }
    }

    const classes = twMerge(`flex justify-center items-center font-medium transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-40 ${getFullWidth()} ${getSize()} ${getRounded()} ${getVariant()} ${className ?? ""}`);

    return <button {...props} className={classes} disabled={disabled}>{showSpinner()}{showStartIcon()} {children} {showEndIcon()}</button>; 
}

export default Button;