import { twMerge } from "tailwind-merge";

interface Props {
    [prop: string]: any;
    label?: string;
    multiple?: boolean;
}

const FileUploader = ({label, className, register, error, multiple = false, ...props}: Props): JSX.Element => { 
    let classes = twMerge(`w-full px-4 py-2 bg-slate-700 text-white border-0 rounded ${className ?? ""}`);

    if(error) classes = twMerge(`${classes} border-2 border-red-500`);

    return (
        <p className="text-left">
            {label && <label className="mb-2 block font-medium">{label}</label>}
            <input type="file" className={classes} {...register} {...props} aria-invalid={error ? "true" : "false"} multiple={multiple} />
            { error && <span className="block text-red-500 font-medium mt-2">{error}</span>}
        </p>
    )
}

export default FileUploader;