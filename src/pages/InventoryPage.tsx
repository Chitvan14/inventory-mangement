import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getItems } from "../services/api";
import { Item } from "../interfaces";
import Table from "../components/Table";
import Card from "../components/Card";
import Button from "../components/Button";

const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [view, setView] = useState<string>("card");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items", error);
        toast.error("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Item Name", accessor: "item_name" },
      { Header: "M.R.P", accessor: "mrp" },
      { Header: "Net Rate", accessor: "net_rate" },
      { Header: "Customer Rate", accessor: "customer_rate" },
      { Header: "Doctor Rate", accessor: "doctor_rate" },
      { Header: "Party", accessor: "party" },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }: { row: { original: { id: number } } }) => (
          <Button
            onClick={() => navigate(`/edit-item/${row.original.id}`)}
            isActive={true}
            label="Edit"
          />
        ),
      },
    ],
    [navigate]
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold uppercase mb-4 font-oswald">
        Inventory
      </h1>
      <p>Welcome, {window.location.hostname.split(".")[0]}!</p>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Button
              onClick={() => navigate("/add-item")}
              isActive={true}
              className={`mr-2`}
              label="Item ➕"
            />{" "}
            <Button
              onClick={() => navigate("/add-party")}
              isActive={true}
              label="Party ➕"
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setView("card")}
              isActive={view === "card"}
              className={`mr-2 flex items-center justify-center`} // Added flex and center alignment
              label={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" // Set the width explicitly
                  height="24" // Set the height explicitly
                >
                  <path
                    d="M5.6 3A2.6 2.6 0 0 0 3 5.6v2.8A2.6 2.6 0 0 0 5.6 11h2.8A2.6 2.6 0 0 0 11 8.4V5.6A2.6 2.6 0 0 0 8.4 3H5.6ZM5.6 13A2.6 2.6 0 0 0 3 15.6v2.8A2.6 2.6 0 0 0 5.6 21h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8A2.6 2.6 0 0 0 8.4 13H5.6ZM15.6 3A2.6 2.6 0 0 0 13 5.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8A2.6 2.6 0 0 0 21 8.4V5.6A2.6 2.6 0 0 0 18.4 3h-2.8ZM15.6 13a2.6 2.6 0 0 0-2.6 2.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8a2.6 2.6 0 0 0-2.6-2.6h-2.8Z"
                    fill={"#000000"} // Adjust the fill color based on the button state
                  />
                </svg>
              }
            />
            <Button
              onClick={() => setView("table")}
              isActive={view === "table"}
              className={`flex items-center justify-center`} // Added flex and center alignment
              label={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" // Set the width explicitly
                  height="24" // Set the height explicitly
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V8C1 9.65685 2.34315 11 4 11H20C21.6569 11 23 9.65685 23 8V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H20C20.5523 9 21 8.55228 21 8V4Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23 16C23 14.3431 21.6569 13 20 13H4C2.34315 13 1 14.3431 1 16V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V16ZM21 16C21 15.4477 20.5523 15 20 15H4C3.44772 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V16Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                  </g>
                </svg>
              }
            />
          </div>
        </div>
        {view === "table" ? (
          <Table columns={columns} data={items} />
        ) : (
          <Card columns={columns} data={items} />
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
