import React from "react";
import "./ImmunizationHistoryTable.css"
const ImmunizationHistoryTable = ({ immunizationRecords }) => {
  return (
    <table className="immunization-history-table">
      <thead>
        <tr>
          <th>Vaccine Name</th>
          <th>Date Administered</th>
          <th>Dose Number</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {immunizationRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.vaccineName}</td>
            <td>{record.dateAdministered}</td>
            <td>{record.doseNumber}</td>
            <td>{record.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ImmunizationHistoryTable;