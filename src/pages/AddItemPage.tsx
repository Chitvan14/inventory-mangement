import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { getParties, addItem, updateItem, getItems } from "../services/api";
import { Item, Party } from "../interfaces";
import Button from "../components/Button";

const AddItemPage: React.FC = () => {
  const [item, setItem] = useState<Item>({
    item_name: "",
    mrp: "",
    net_rate: "",
    customer_rate: "",
    doctor_rate: "",
    party: "",
  });
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const data = await getParties();
        setParties(data);
      } catch (error) {
        console.error("Failed to fetch parties", error);
        toast.error("Failed to fetch parties");
      } finally {
        setLoading(false);
      }
    };

    const fetchItem = async () => {
      if (id) {
        setIsEdit(true);
        const items = await getItems();
        const item = items.find((item: Item) => item.id === parseInt(id));
        if (item) {
          setItem(item);
        }
      }
    };

    fetchParties();
    fetchItem();
  }, [id]);

  const handleSaveItem = async () => {
    try {
      if (isEdit && id) {
        await updateItem(parseInt(id), item);
        toast.success("Item updated successfully");
      } else {
        await addItem(item);
        toast.success("Item added successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save item", error);
      toast.error("Failed to save item");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handlePartyChange = (selectedOption: any) => {
    setItem({ ...item, party: selectedOption.value });
  };

  const partyOptions = parties.map((party) => ({
    value: party.name,
    label: party.name,
  }));

  const selectedPartyOption = partyOptions.find(
    (option) => option.value === item.party
  );

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-md">
      <div className="flex items-center mb-6">
        <span onClick={() => navigate("/")}>🔙</span>
        <h1 className=" flex-1 text-center text-4xl font-bold uppercase font-oswald">
          {isEdit ? "Edit Item" : "Add Item"}
        </h1>
      </div>

      <div className="mb-4">
        <label
          htmlFor="item_name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Item Name
        </label>
        <input
          type="text"
          id="item_name"
          name="item_name"
          value={item.item_name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="party"
          className="block text-gray-700 font-semibold mb-2"
        >
          Select Party
        </label>
        <Select
          options={partyOptions}
          placeholder="Select Party"
          isLoading={loading}
          onChange={handlePartyChange}
          value={selectedPartyOption}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mrp" className="block text-gray-700 font-semibold mb-2">
          M.R.P
        </label>
        <input
          type="number"
          id="mrp"
          name="mrp"
          value={item.mrp}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="net_rate"
          className="block text-gray-700 font-semibold mb-2"
        >
          Net Rate
        </label>
        <input
          type="number"
          id="net_rate"
          name="net_rate"
          value={item.net_rate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="customer_rate"
          className="block text-gray-700 font-semibold mb-2"
        >
          Customer Rate
        </label>
        <input
          type="number"
          id="customer_rate"
          name="customer_rate"
          value={item.customer_rate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="doctor_rate"
          className="block text-gray-700 font-semibold mb-2"
        >
          Doctor Rate
        </label>
        <input
          type="number"
          id="doctor_rate"
          name="doctor_rate"
          value={item.doctor_rate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSaveItem}
          label={isEdit ? "Update Item" : "Add Item"}
          isActive={true}
        />
      </div>
    </div>
  );
};

export default AddItemPage;
