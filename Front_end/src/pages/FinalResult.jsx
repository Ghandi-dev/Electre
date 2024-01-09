import Aside from "./template/Aside";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import ReactToPrint from "react-to-print";
import { useEffect, useState, useRef } from "react";
import { getAll as getAllCriteria } from "./Criteria";
import { getAll as getAllAlternatif } from "./Alternative";
import { getAll as getAllValue } from "./InsertValue";
import {
  NormalisasiMatriks,
  PembobotanMatriks,
  ConcordenSet,
  DiscordanceSet,
  MatriksConcordance,
  MatriksDiscordance,
  Treshold,
  MDConcordance,
  MDDiscordance,
  AgregatDominan,
} from "../utils/ElectreCalculation";

const FinalResult = () => {
  const [restart, setRestart] = useState();
  const [top, setTop] = useState();
  const componentRef = useRef();
  const [criteria, setCriteria] = useState([]);
  const [alternatif, setAlternatif] = useState([]);
  const [values, setValues] = useState([]);
  //   const [restart, setRestart] = useState(false);
  const normalisasiMatriks = NormalisasiMatriks(alternatif, values);
  const pembobotanMatriks = PembobotanMatriks(normalisasiMatriks, criteria);
  const concordenSet = ConcordenSet(alternatif, pembobotanMatriks, criteria);
  const discordanceSet = DiscordanceSet(
    alternatif,
    pembobotanMatriks,
    criteria
  );
  const matriksConcordance = MatriksConcordance(concordenSet, criteria);
  const matriksDiscordance = MatriksDiscordance(
    discordanceSet,
    pembobotanMatriks
  );
  const tresholdConcordance = Treshold(matriksConcordance);
  const tresholdDiscordance = Treshold(matriksDiscordance);
  const dominanConcordance = MDConcordance(
    tresholdConcordance,
    matriksConcordance
  );
  const dominanDiscordance = MDDiscordance(
    tresholdDiscordance,
    matriksDiscordance
  );
  const agregatDominan = AgregatDominan(dominanConcordance, dominanDiscordance);
  const countOnes = {};

  for (const keyA in agregatDominan) {
    let count = 0;
    for (const keyB in agregatDominan[keyA]) {
      if (agregatDominan[keyA][keyB] === 1) {
        count++;
      }
    }
    countOnes[keyA] = count;
  }

  const sortedKeys = Object.keys(countOnes).sort(
    (a, b) => countOnes[b] - countOnes[a]
  );

  const sortedData = sortedKeys.map((id) =>
    alternatif.find((item) => item.id.toString() === id)
  );
  useEffect(() => {
    getAllCriteria()
      .then((data) => {
        setCriteria(data); // Mengatur state alternatif dengan data yang diterima dari getAll
      })
      .catch((error) => {
        console.error(error);
      });
    getAllAlternatif()
      .then((data) => {
        setAlternatif(data); // Mengatur state alternatif dengan data yang diterima dari getAll
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
    setRestart(false);
  }, [restart]);
  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar name="Data Hasil Akhir" />
        <div className="bg-gradient-default rounded-top pt-3 align-items-center mx-4">
          <div className="row">
            <div className="col-6">
              <h4 className="px-3 fw-bold">Hasil Akhir</h4>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <ReactToPrint
                trigger={() => (
                  <button className="btn bg-gradient-info btn-sm mx-3 mt-2">
                    Print
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </div>
        <div className="card mt-3 mx-4" ref={componentRef}>
          <div>
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7 ">
                    Nama Alternatif
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7 ">
                    Ranking
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((data, index) => (
                  <tr
                    key={index}
                    className={index === 0 ? "bg-gradient-success" : ""}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{index + 1}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="container-fluid py-3 mx-2 text-center">
              <p>
                Berdasarkan perhitungan dengan metode Elimination Et Choix
                Traduisant La Realité. Lokasi usaha yang direkomendasikan ialah{" "}
                {sortedData.map((data, index) =>
                  index === 0 ? data.name : ""
                )}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default FinalResult;
