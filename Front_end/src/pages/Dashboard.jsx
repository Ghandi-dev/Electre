import Aside from "./template/Aside";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import RadarChart from "../components/RadarChart";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Mendaftarkan skala radialLinear

import { getAll as getAllAlternatif } from "./Alternative";
import { getAll as getAllCriteria } from "./Criteria";
import { getAll as getAllSubCriteria } from "./SubCriteria";
import { getAll as getAllValue } from "./InsertValue";
const Dashboard = () => {
  const data = {
    labels: ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"],
    datasets: [
      {
        label: "Data 1",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [0, 6, 7, 8, 9],
      },
    ],
  };
  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };
  const [restart, setRestart] = useState(false);
  const [alternatif, setAlternatif] = useState([]);
  const [value, setValues] = useState([]);
  const [subCriteria, setSubCriteria] = useState([]);
  const [criteria, setCriteria] = useState([]);
  useEffect(() => {
    getAllAlternatif()
      .then((data) => {
        setAlternatif(data);
        setRestart(false);
      })
      .catch((error) => {
        console.error(error);
      });
    getAllCriteria()
      .then((data) => {
        setCriteria(data); // Mengatur state alternatif dengan data yang diterima dari getAll
      })
      .catch((error) => {
        console.error(error);
      });
    getAllSubCriteria()
      .then((data) => {
        setSubCriteria(data); // Mengatur state alternatif dengan data yang diterima dari getAll
      })
      .catch((error) => {
        console.error(error);
      });
    getAllValue()
      .then((data) => {
        setValues(data); // Mengatur state alternatif dengan data yang diterima dari getAll
      })
      .catch((error) => {
        console.error(error);
      });
  }, [restart]);
  const combinedData = alternatif.map((altItem) => {
    const values = value
      .filter((valItem) => valItem.tbAlternatifId === altItem.id)
      .map((valItem) => {
        const criteriaCode =
          criteria.find((crit) => crit.id === valItem.tbCriteriumId)?.code ||
          "";
        return { ...valItem, criteriaCode };
      });
    return { ...altItem, values };
  });

  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar name="Dashboard" />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Alternatif
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {alternatif.length}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Kriteria
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {criteria.length}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-world text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          SubKriteria
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {subCriteria.length}
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RadarChart data={combinedData} />;
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
