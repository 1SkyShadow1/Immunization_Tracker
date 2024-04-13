import React from "react";
import "./ImmunizationHistoryTable.css"

const ImmunizationHistoryTable = ({ immunizationRecords, handleUpdate, handleDelete }) => {
  return (
    <table className="immunization-history-table">
      <thead>
        <tr>
          <th>Vaccine_Name</th>
          <th>Date Administered</th>
          <th>Next Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {immunizationRecords.map((record) => (
          <tr key={record.id}>
            <td>{record.vaccine_name}</td><td>{record.dateAdministered}</td><td>{record.doseNumber}</td><td>{record.notes}</td><td>
              <button onClick={() => { try { handleUpdate(record.id) } catch (e) { console.error(e) } }}>Update</button>
              <button onClick={() => { try { handleDelete(record.id) } catch (e) { console.error(e) } }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ImmunizationHistoryTable;