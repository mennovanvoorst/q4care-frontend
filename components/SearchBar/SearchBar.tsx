import { IoSearch } from "react-icons/io5";

type Props = {
  items: {
    [key: string]: string;
  }[];
  onChange: (items: any[]) => void;
};

export const SearchBar = ({ items, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredArray = items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    onChange(filteredArray);
  };

  return (
    <div className="relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 h-full py-2">
        <IoSearch />
      </span>

      <input
        type="text"
        placeholder="Search for item..."
        className="w-full pr-4 pl-10 py-2 bg-slate-700 text-white border-0 rounded focus:outline-0"
        onChange={handleChange}
      />
    </div>
  );
};
