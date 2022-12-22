import Heading from "./Heading";

interface Props {
    title: string;
    children?: React.ReactNode;
}
const PageHeader = ({ title, children }: Props) => (
<div className="border-b border-slate-700 flex justify-between items-center">
    <Heading as="h1">{ title }</Heading>
    <div className="flex items-center gap-4">{ children }</div>
</div>
);

export default PageHeader;