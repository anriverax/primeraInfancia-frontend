import React from "react";

const PersonForm = ({ person }: { person: any }) => (
  <form>
    <div>
      <label>Nombre:</label>
      <input type="text" value={person?.firstName || ""} readOnly />
    </div>
    <div>
      <label>Apellido 1:</label>
      <input type="text" value={person?.lastName1 || ""} readOnly />
    </div>
    <div>
      <label>Apellido 2:</label>
      <input type="text" value={person?.lastName2 || ""} readOnly />
    </div>
    {/* Add more fields as needed */}
  </form>
);

export default PersonForm;