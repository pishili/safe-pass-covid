import React from 'react';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import MaterialTable from "material-table";

export default function SearchTable(props) {
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "Adı", field: "name" },
          { title: "Soyadı", field: "surname" },
          { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
          }
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
        ]}
        title="Demo Title"
      />
    </div>
  )
}
