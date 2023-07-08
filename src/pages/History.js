import React, {useEffect, useState} from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
} from "@mui/material";
import useAuthStore from "../authStore";
import {path} from "../constant";

function History() {
  const authStore = useAuthStore();
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(path + "/histories", {
          headers: {
            Authorization: `${authStore.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHistoryData(data);
        } else {
          throw new Error("Failed to fetch history data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [authStore.token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h5" sx={{color: "primary.main"}} gutterBottom>
        History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "primary.main"}}>ID</TableCell>
            <TableCell sx={{color: "primary.main"}}>Date</TableCell>
            <TableCell sx={{color: "primary.main"}}>Image</TableCell>
            <TableCell sx={{color: "primary.main"}}>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((history) => (
              <TableRow key={history.id}>
                <TableCell>{history.id}</TableCell>
                <TableCell>{history.date}</TableCell>
                <TableCell>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={history.url}
                      alt={`History ${history.id}`}
                      style={{width: "100%", height: "auto"}}
                    />
                  </div>
                </TableCell>
                <TableCell>{history.user_id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={historyData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default History;
