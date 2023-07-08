import React, {useEffect, useState} from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import {Visibility} from "@mui/icons-material";
import useAuthStore from "../authStore";
import {image_path, path} from "../constant";

function Birds() {
  const authStore = useAuthStore();
  const [birdData, setBirdData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBird, setSelectedBird] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        const response = await fetch(path + "/all_birds", {
          headers: {
            Authorization: `${authStore.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBirdData(data.birds);
        } else {
          throw new Error("Failed to fetch bird data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBirds();
  }, [authStore.token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (bird) => {
    setSelectedBird(bird);
    setOpenDialog(true);
  };

  // const handleEditBird = (bird) => {
  //   // Handle edit bird action
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography variant="h5" sx={{color: "primary.main"}} gutterBottom>
        Bird List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "primary.main"}}>Common Name</TableCell>
            <TableCell sx={{color: "primary.main"}}>Scientific Name</TableCell>
            <TableCell sx={{color: "primary.main"}}>Family</TableCell>
            <TableCell sx={{color: "primary.main"}}>Order</TableCell>
            <TableCell sx={{color: "primary.main"}}>
              Conservation Status
            </TableCell>
            <TableCell sx={{color: "primary.main"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {birdData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((bird) => (
              <TableRow key={bird.id}>
                <TableCell>{bird.common_name}</TableCell>
                <TableCell>{bird.scientific_name}</TableCell>
                <TableCell>{bird.family}</TableCell>
                <TableCell>{bird.bird_order}</TableCell>
                <TableCell>{bird.conservation_status}</TableCell>
                <TableCell>
                  <Box display={"flex"} flexDirection={"row"}>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(bird)}
                    >
                      <Visibility />
                    </IconButton>
                    {/* <IconButton
                      color="primary"
                      onClick={() => handleEditBird(bird)}
                    >
                      <Edit />
                    </IconButton> */}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={birdData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant="h4" sx={{color: "primary.main"}} gutterBottom>
            Bird Detail
          </Typography>
        </DialogTitle>
        {selectedBird && (
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {[2, 3].map((i, index) => (
                <img
                  key={index}
                  src={`${image_path}${selectedBird?.class_name}/${i}.jpg`}
                  alt="Bird"
                  style={{marginRight: "16px"}}
                />
              ))}
            </div>
            <Typography variant="h6" gutterBottom>
              <strong>Common Name:</strong> {selectedBird.common_name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Scientific Name:</strong> {selectedBird.scientific_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Family:</strong> {selectedBird.family}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Order:</strong> {selectedBird.bird_order}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Conservation Status:</strong>{" "}
              {selectedBird.conservation_status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {selectedBird.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Diet:</strong> {selectedBird.diet}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Distribution:</strong> {selectedBird.distribution}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Height:</strong> {selectedBird.height}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Vietnamese Name:</strong> {selectedBird.vietnamese_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Weight:</strong> {selectedBird.weight}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Birds;
