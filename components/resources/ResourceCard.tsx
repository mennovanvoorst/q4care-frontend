import Link from "next/link";
import { IoChevronForward, IoDocumentTextOutline, IoDocumentAttachOutline, IoImagesOutline } from "react-icons/io5";

interface Props {
  id: string;
  title: string;
  description: string;
  hasAttachment?: boolean;
  hasMedia?: boolean;
}
const ResourceCard = ({id, title, description, hasAttachment = false, hasMedia = false, ...props}: Props) => {
  const renderIcon = () => {
    if(hasAttachment) return <IoDocumentAttachOutline />;
    if(hasMedia) return <IoImagesOutline />;

    return <IoDocumentTextOutline />;
  }

  return (
    <li className={`bg p-4 rounded-xl bg-slate-700 hover:bg-slate-600 hover:cursor-pointer`} {...props}>
        <Link href={`/resources/${id}`} className="flex items-center gap-4">
          <span className="w-8">{renderIcon()}</span>
          <p className="flex flex-col grow mb-0">
            <span className="font-medium">{title}</span>
            <span className="text-sm">{description}</span>
          </p>
          <div className="w-8"><IoChevronForward /></div>
        </Link>
    </li>
  );
};

export default ResourceCard;