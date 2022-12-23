import { IoCloudDownload } from "react-icons/io5";
import Spinner from "../common/Spinner";

interface Props {
    icon: React.ReactNode;
  title: string;
  description: string;
  loading?: boolean;
  onClick?: () => Promise<void>;
}
const CertificateCard = ({icon, title, description, loading = false, ...props}: Props) => {
  return (
    <li className={`bg p-4 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center gap-4 hover:cursor-pointer ${loading && "opacity-50 hover:cursor-not-allowed"}`} {...props}>
        <span className="w-8">{loading ? <Spinner size="sm" /> : icon}</span>
        <p className="flex flex-col grow mb-0">
          <span className="font-medium">{title}</span>
          <span className="text-sm">{description}</span>
        </p>
        <div className="w-8"><IoCloudDownload /></div>
    </li>
  );
};

export default CertificateCard;