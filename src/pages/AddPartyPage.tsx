import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addParty, updateParty, getParties } from "../services/api";
import { Party } from "../interfaces";
import Button from "../components/Button";

const AddPartyPage: React.FC = () => {
  const [partyName, setPartyName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParty = async () => {
      if (id) {
        setIsEdit(true);
        const parties = await getParties();
        const party = parties.find((party: Party) => party.id === parseInt(id));
        if (party) {
          setPartyName(party.name);
        }
      }
    };
    fetchParty();
  }, [id]);

  const handleSaveParty = async () => {
    try {
      if (isEdit && id) {
        await updateParty(parseInt(id), { name: partyName });
        toast.success("Party updated successfully");
      } else {
        await addParty({ name: partyName });
        toast.success("Party added successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save party", error);
      toast.error("Failed to save party");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-md">
      <div className="flex items-center mb-6">
        <span onClick={() => navigate("/")}>🔙</span>
        <h1 className=" flex-1 text-center text-4xl font-bold uppercase font-oswald">
          {isEdit ? "Edit Party" : "Add Party"}
        </h1>
      </div>

      <div className="mb-4">
        <label
          htmlFor="party_name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Party Name
        </label>
        <input
          type="text"
          id="party_name"
          placeholder="Party Name"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-end">
        {" "}
        <Button
          isActive={true}
          onClick={handleSaveParty}
          label={isEdit ? "Update Party" : "Add Party"}
        />
      </div>
    </div>
  );
};

export default AddPartyPage;
