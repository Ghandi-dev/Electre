import Aside from "./template/Aside";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getAll as getAllCriteria } from "./Criteria";
import { getAll as getAllAlternatif } from "./Alternative";
import { getAll as getAllSubCriteria } from "./SubCriteria";

export const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:3000/values");
    return response.data.payload.datas;
  } catch (error) {
    throw new Error("There was a problem fetching the data:", error);
  }
};

const create = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/values", data);
    return response.data;
  } catch (error) {
    throw new Error("There was a problem post the data:", error);
  }
};

const update = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/values/update", {
      datas: data,
    });
    return response;
  } catch (error) {
    throw new Error("There was a problem update the data:", error);
  }
};

const InsertValue = () => {
  const [modal, setModal] = useState();
  const [alternatif, setAlternatif] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [subCriteria, setSubCriteria] = useState([]);
  const [values, setValues] = useState([]);
  const [ubah, setUbah] = useState([]);
  const combinedData = criteria.map((criterion) => ({
    ...criterion,
    subCriteria: subCriteria.filter(
      (subCriterion) => subCriterion.tbCriteriumId === criterion.id
    ),
  }));
  const [tambah, setTambah] = useState({
    tbAlternatifId: "",
    option: {},
  });
  const [restart, setRestart] = useState(false);
  const existsSameId = (data) =>
    values.some((item) => item.tbAlternatifId === data);

  useEffect(() => {
    getAllCriteria()
      .then((data) => {
        setCriteria(data);
      })
      .catch((error) => {
        console.error(error);
      });
    getAllAlternatif()
      .then((data) => {
        setAlternatif(data);
      })
      .catch((error) => {
        console.error(error);
      });
    getAllSubCriteria()
      .then((data) => {
        setSubCriteria(data);
      })
      .catch((error) => {
        console.error(error);
      });
    getAll()
      .then((data) => {
        setValues(data);
        setRestart(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [restart]);

  const getById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/values/${id}`);

      response.data.payload.datas.map((data) =>
        setTambah((prevState) => ({
          ...prevState,
          option: {
            ...prevState.option,
            [data.tbCriteriumId]: data.nilai, // Menggunakan criterion.id sebagai kunci
          },
        }))
      );
    } catch (error) {
      throw new Error("There was a problem fetching the data:", error);
    }
  };

  const handleSelectChange = (criterionId, selectedValue) => {
    setTambah((prevState) => ({
      ...prevState,
      option: {
        ...prevState.option,
        [criterionId]: selectedValue, // Menggunakan criterion.id sebagai kunci
      },
    }));
  };

  const handleCreate = () => {
    let dataTambah = Object.entries(tambah.option).map(
      ([tbCriteriumId, nilai]) => ({
        tbAlternatifId: tambah.tbAlternatifId,
        tbCriteriumId: parseInt(tbCriteriumId),
        nilai: parseInt(nilai),
      })
    );
    create(dataTambah)
      .then((data) => {
        if (data.payload.status_code === 200) {
          setRestart(true);
          Swal.fire({
            icon: "success",
            title: "Data berhasil ditambahkan",
            confirmButtonText: "OK",
          });
          setTambah({ ...tambah, tbAlternatifId: "", option: {} });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (id) => {
    let dataUbah = Object.entries(tambah.option).map(
      ([tbCriteriumId, nilai]) => ({
        tbAlternatifId: tambah.tbAlternatifId,
        tbCriteriumId: parseInt(tbCriteriumId),
        nilai: parseInt(nilai),
      })
    );
    update(dataUbah)
      .then((res) => {
        if (res) {
          setRestart(true);
          Swal.fire({
            icon: "success",
            title: "Data berhasil diubah",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(tambah);
  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar name="Data Penilaian" />
        <div className="card mt-3 mx-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="px-3 fw-bold">Data Penilaian</h4>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center mb-0 ">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    No
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Nama Alternatif
                  </th>
                  <th className="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {alternatif.map((data, index) => {
                  return (
                    <tr
                      key={data.id}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "white" }
                          : { backgroundColor: "#e9ecef" }
                      }
                    >
                      <td>
                        <div className="d-flex px-2">
                          <div className="my-auto">
                            <h6 className="mb-0 text-xs">{index + 1}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <div className="">
                          {existsSameId(data.id) ? (
                            <button
                              type="button"
                              className="btn bg-gradient-warning btn-sm mt-3 mx-2"
                              style={{ fontSize: 10 }}
                              data-bs-toggle="modal"
                              data-bs-target="#updateModal"
                              onClick={() => {
                                setModal(data.name);
                                getById(data.id);
                                setTambah({
                                  ...tambah,
                                  tbAlternatifId: data.id,
                                });
                              }}
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn bg-gradient-info btn-sm mt-3 "
                              data-bs-toggle="modal"
                              data-bs-target="#createModal"
                              style={{ fontSize: 10 }}
                              onClick={() =>
                                setTambah({
                                  ...tambah,
                                  tbAlternatifId: data.id,
                                })
                              }
                            >
                              Isi Nilai
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container py-3"></div>
        </div>
        <Footer />
      </main>
      {/* Modal Tambah */}
      <div
        className="modal fade"
        id="createModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card card-plain">
                <div className="row">
                  <div className="col">
                    <div className="card-header pb-0 text-left">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        {/* {modal} */}
                      </h3>
                    </div>
                  </div>
                  <div className="col-1 d-flex justify-content-end ">
                    <button
                      type="button"
                      className="btn-close text-dark px-4 pt-4"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <h4 aria-hidden="true">×</h4>
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <form role="form text-left">
                    {combinedData.map((criterion, index) => (
                      <div key={index}>
                        <label>{criterion.name}</label>
                        <select
                          value={tambah.option[criterion.id] || ""}
                          className="form-control"
                          onChange={(e) =>
                            handleSelectChange(criterion.id, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Pilih nilai yang sesuai
                          </option>
                          {criterion.subCriteria.map((data, subIndex) => (
                            <option key={subIndex} value={data.nilai}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                        onClick={handleCreate}
                        // disabled={/* Tambahkan logika validasi di sini */}
                        data-bs-dismiss="modal"
                      >
                        Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="updateModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card card-plain">
                <div className="row">
                  <div className="col">
                    <div className="card-header pb-0 text-left">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        {modal}
                      </h3>
                    </div>
                  </div>
                  <div className="col-1 d-flex justify-content-end ">
                    <button
                      type="button"
                      className="btn-close text-dark px-4 pt-4"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <h4 aria-hidden="true">×</h4>
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <form role="form text-left">
                    {combinedData.map((criterion, index) => (
                      <div key={index}>
                        <label>{criterion.name}</label>
                        <select
                          value={tambah.option[criterion.id] || ""}
                          className="form-control"
                          onChange={(e) =>
                            handleSelectChange(criterion.id, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Pilih nilai yang sesuai
                          </option>
                          {criterion.subCriteria.map((data, subIndex) => (
                            <option key={subIndex} value={data.nilai}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                        onClick={handleUpdate}
                        // disabled={/* Tambahkan logika validasi di sini */}
                        data-bs-dismiss="modal"
                      >
                        Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsertValue;
