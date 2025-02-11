import { useState } from "react";
import { useRouter } from "next/router";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex items-center border rounded-md p-2">
      <input
        
        type="text"
        placeholder="Search products..."
        className="ml-2 p-1 w-full focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <IoSearchSharp className="text-2xl cursor-pointer" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
