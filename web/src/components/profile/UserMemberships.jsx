"use client";

import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { useToast } from "components/Toast";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export default function UserMemberships({ rows = [] }) {
  const { triggerToast } = useToast();

  // fetch cid -> club name mapping
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    (async () => {
      let res = await fetch("/actions/clubs/ids");
      res = await res.json();
      if (!res.ok) {
        triggerToast({
          title: "Unable to fetch clubs",
          messages: res.error.messages,
          severity: "error",
        });
      } else {
        setClubs(
          res.data.reduce((acc, { cid, name }) => {
            acc[cid] = name;
            return acc;
          }, {}),
        );
      }
    })();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Role",
      flex: 7,
      renderCell: (p) => p.value,
    },
    {
      field: "cid",
      headerName: "Club",
      flex: 5,
      renderCell: (p) => clubs[p.value],
    },
    {
      field: "startYear",
      headerName: "Start Year",
      headerAlign: "center",
      align: "center",
      flex: 3,
    },
    {
      field: "endYear",
      headerName: "End Year",
      headerAlign: "center",
      align: "center",
      valueGetter: ({ row }) => row.endYear || "-",
      flex: 3,
    },
  ];

  return (
    <>
      {rows?.filter((row) => row.cid === CLUB_ID)?.length ?
        <DataGrid
          autoHeight
          rows={rows?.filter((row) => row.cid === CLUB_ID)}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.rid}
          initialState={{
            sorting: {
              sortModel: [{ field: "endYear", sort: "asc" }],
            },
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableColumnMenu={true}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            // disable cell selection style
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            borderColor: "divider",
            "& .MuiDataGrid-columnHeaders": {
              borderColor: "divider",
              borderBottom: "1px solid",
            },
            "& .MuiDataGrid-cell": {
              borderColor: "divider",
              borderBottom: "1px solid",
            },
            "& .MuiDataGrid-footerContainer": {
              borderColor: "divider",
              borderTop: "1px solid",
            },
            // Turn off hover effect
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "inherit"
            },
            "& .MuiDataGrid-row.Mui-hovered": {
              backgroundColor: "inherit",
            },
          }}
        /> : "No Memberships Found!"
      }
    </>
  );
}
