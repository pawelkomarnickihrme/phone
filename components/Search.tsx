"use client";
import { useState } from "react";
import { getPhone } from "@/utils/getPhone";

export default function PhoneForm() {
  const [id, setId] = useState("");
  const [phoneData, setPhoneData] = useState(null);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // const data = await getPhone(id);
    // if (data && data[0]) setPhoneData(data[0]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter phone ID"
      />
      <button type="submit">Get Phone Data</button>
      {phoneData && <div>{JSON.stringify(phoneData)}</div>}
    </form>
  );
}
