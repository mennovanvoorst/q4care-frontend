import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";


const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

interface Props {
    [prop: string]: any;
    label?: string;
    error?: any;
    onChange: (data) => void;
    value: any;
}

const RichTextEditor = ({ label, onChange, error, value, className }: Props) => {
    let classes = twMerge(`w-full px-4 py-2 bg-slate-700 text-white border-0 rounded ${className ?? ""}`);

    if(error) classes = twMerge(`${classes} border-2 border-red-500`);

 return (
  <p className="text-left">
    {label && <label className="mb-2 block font-medium">{label}</label>}
    <ReactQuill theme="snow" name="test" className={classes} onChange={onChange} value={value} modules={modules}
                    formats={formats} />
    { error && <span className="block text-red-500 font-medium mt-2">{error}</span>}
  </p>
 );
}

export default RichTextEditor;