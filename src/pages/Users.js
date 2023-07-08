import React, {useState, useEffect} from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthStore from "../authStore";
import {path} from "../constant";

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(path + "/users", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("first" + data);

          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRole = async (event, index) => {
    const selectedUser = users[index];
    const newRole = event.target.value;

    try {
      const response = await fetch(
        `${path}/users/${selectedUser.id}/update-role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({role: newRole}),
        }
      );

      if (response.ok) {
        console.log("User role updated successfully");
        const updatedUsers = [...users];
        updatedUsers[index].role = newRole;
        setUsers(updatedUsers);
      } else {
        throw new Error("Error updating user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (index) => {
    const selectedUser = users[index];

    console.log(selectedUser);

    try {
      const response = await fetch(`${path}/users/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        console.log("User deleted successfully");
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
      } else {
        throw new Error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        User List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "primary.main"}}>Email</TableCell>
            <TableCell sx={{color: "primary.main"}}>Created At</TableCell>
            <TableCell sx={{color: "primary.main"}}>Role</TableCell>
            <TableCell sx={{color: "primary.main"}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  {new Date(data.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    value={data.role}
                    onChange={(event) => handleChangeRole(event, index)}
                    size="small"
                    style={{width: "100px"}}
                  >
                    <MenuItem value={0}>User</MenuItem>
                    <MenuItem value={1}>Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Users;
