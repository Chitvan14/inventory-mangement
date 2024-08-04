import React, { useState, useEffect } from "react";

interface SearchDropdownProps {
  label: string;
  items: string[];
  onAddItem: (item: string) => void;
  onSelectItem: (item: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  label,
  items,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
     
      {/* {filteredItems.length === 0 && (
        <button
          onClick={() => onAddItem(searchTerm)}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-md"
        >
          Add
        </button>
      )} */}
      {/* {filteredItems.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-md">
          {filteredItems.map((item) => (
            <li
              key={item}
              onClick={() => onSelectItem(item)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default SearchDropdown;
