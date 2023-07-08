import React, {useEffect, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import useAuthStore from "../authStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {path} from "../constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchData = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Failed to fetch data from ${url}`);
  }
};

function Dashboard() {
  const {token} = useAuthStore();
  const [stats, setStats] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(path + "/stats", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          throw new Error("Failed to fetch stats data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [token]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const historyData = await fetchData(
          path + "/history/week-count",
          token
        );
        const userData = await fetchData(
          path + "/users/registration-stats/week-count",
          token
        );
        if (Array.isArray(historyData) && Array.isArray(userData)) {
          const labels = historyData.map((item) => item.date);
          const dataset1Data = historyData.map((item) => item.count);
          const dataset2Data = userData.map((item) => item.count);

          const newData = {
            labels,
            datasets: [
              {
                label: "Số định danh của user",
                data: dataset1Data,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Số user đăng ký",
                data: dataset2Data,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          };

          setData1(newData);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChartData();
  }, [token]);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div>
      <Typography variant="h5" sx={{color: "primary.main"}} gutterBottom>
        Dashboard
      </Typography>
      {stats && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{backgroundColor: "#c4e0e5"}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Birds
                </Typography>
                <Typography variant="h4">{stats.birds_count}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{backgroundColor: "#e6c5c0"}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Histories
                </Typography>
                <Typography variant="h4">{stats.histories_count}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{backgroundColor: "#d4d6d9"}}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4">{stats.users_count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {data1 && (
        <Card sx={{marginTop: 2}}>
          <CardContent>
            <Line data={data1} options={chartOptions} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Dashboard;
