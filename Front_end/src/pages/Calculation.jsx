import Aside from "./template/Aside";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import { useEffect, useState } from "react";
import { getAll as getAllCriteria } from "./Criteria";
import { getAll as getAllAlternatif } from "./Alternative";
import { getAll as getAllValue } from "./InsertValue";
import { getAll as getAllSubCriteria } from "./SubCriteria";
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

const Calculation = () => {
  const [criteria, setCriteria] = useState([]);
  const [alternatif, setAlternatif] = useState([]);
  const [subCriteria, setSubCriteria] = useState([]);
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
  const grouped = values.reduce((acc, curr) => {
    const { tbAlternatifId, ...rest } = curr;
    if (!acc[tbAlternatifId]) {
      acc[tbAlternatifId] = [];
    }
    acc[tbAlternatifId].push(rest);
    return acc;
  }, {});

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
    getAllSubCriteria()
      .then((data) => {
        setSubCriteria(data); // Mengatur state alternatif dengan data yang diterima dari getAll
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(grouped);
  console.log(subCriteria);
  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar name="Data Perhitungan" />
        {/* Matriks Rating Kecocokan Alternatif Pada Kriteria */}
        <div className="card mt-3 mx-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="px-3 fw-bold">Data Awal</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {criteria.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      {grouped[data.id].map((data2, subIndex) => {
                        return subCriteria
                          .filter(
                            (item) =>
                              item.tbCriteriumId === data2.tbCriteriumId &&
                              item.nilai === data2.nilai
                          )
                          .map((data3, subIndex2) => {
                            return (
                              <td key={subIndex2} className="text-center">
                                <span className="badge badge-dot me-4">
                                  <i className="bg-info" />
                                  <span className="text-dark text-xs">
                                    {data3.name}
                                  </span>
                                </span>
                              </td>
                            );
                          });
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Rating Kecocokan Alternatif Pada Kriteria */}
        <div className="card mt-3 mx-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="px-3 fw-bold">
                  Rating Kecocokan Alternatif Pada Kriteria
                </h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {criteria.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      {grouped[data.id].map((data, subIndex) => {
                        return (
                          <td key={subIndex} className="text-center">
                            <span className="badge badge-dot me-4">
                              <i className="bg-info" />
                              <span className="text-dark text-xs">
                                {data.nilai}
                              </span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Normalisasi Matriks Keputusan */}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="px-3 fw-bold">Normalisasi Matriks Keputusan</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {criteria.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      {normalisasiMatriks
                        .filter((result) => result.tbAlternatifId === data.id)
                        .map((data2, subIndex) => {
                          return (
                            <td key={subIndex} className="text-center">
                              <span className="badge badge-dot me-4">
                                <i className="bg-info" />
                                <span className="text-dark text-xs">
                                  {data2.nilai}
                                </span>
                              </span>
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Pembobotan Pada Matriks Yang Telah Dinormalisasi */}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">
                  Pembobotan Pada Matriks Yang Telah Dinormalisasi
                </h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {criteria.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      {pembobotanMatriks
                        .filter((result) => result.tbAlternatifId === data.id)
                        .map((data2, subIndex) => {
                          return (
                            <td key={subIndex} className="text-center">
                              <span className="badge badge-dot me-4">
                                <i className="bg-info" />
                                <span className="text-dark text-xs">
                                  {data2.nilai}
                                </span>
                              </span>
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>

        {/* Himpunan Concordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Himpunan Concordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {concordenSet[data.id][innerData.id].join(",")}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>

        {/* Himpunan Discordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Himpunan Discordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {discordanceSet[data.id][innerData.id].join(",")}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Concordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Matriks Concordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {matriksConcordance[data.id][innerData.id]}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Discordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Matriks Discordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {matriksDiscordance[data.id][innerData.id]}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Dominan Concordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Matriks Dominan Concordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {dominanConcordance[data.id][innerData.id]}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Dominan Discordance*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Matriks Dominan Discordance</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {dominanDiscordance[data.id][innerData.id]}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        {/* Matriks Agregat Dominan*/}
        <div className="card mt-3 mx-4 mt-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-12">
                <h4 className="px-3 fw-bold">Matriks Agregat Dominan</h4>
              </div>
              <div className="col-6 d-flex justify-content-end"></div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Nama Alternatif
                  </th>
                  {alternatif.map((data, index) => {
                    return (
                      <th
                        key={index}
                        className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
                      >
                        {data.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-center">{rowIndex + 1}</td>
                    <td>
                      <span className="badge badge-dot me-4">
                        <i className="bg-info" />
                        <span className="text-dark text-xs">{data.name}</span>
                      </span>
                    </td>
                    {alternatif.map((innerData, colIndex) => (
                      <td key={colIndex} className="text-center">
                        {rowIndex !== colIndex ? (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">
                              {agregatDominan[data.id][innerData.id]}
                            </span>
                          </span>
                        ) : (
                          <span className="badge badge-dot me-4">
                            <i className="bg-info" />
                            <span className="text-dark text-xs">-</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Calculation;
