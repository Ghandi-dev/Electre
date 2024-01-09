import Aside from "./template/Aside";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export const getAll = async () => {
  try {
    const response = await axios.get("http://localhost:3000/alternatives");
    return response.data.payload.datas;
  } catch (error) {
    throw new Error("There was a problem fetching the data:", error);
  }
};

const create = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/alternatives", {
      code: data.code,
      name: data.name,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was a problem post the data:", error);
  }
};

const delele = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/alternatives/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was a problem post the data:", error);
  }
};

const update = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/alternatives/${id}`,
      {
        code: data.code,
        name: data.name,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was a problem post the data:", error);
  }
};

const Alternative = () => {
  const [alternatif, setAlternatif] = useState([]);
  const [tambah, setTambah] = useState({
    code: "",
    name: "",
  });
  const [ubah, setUbah] = useState({
    id: "",
    code: "",
    name: "",
  });
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    getAll()
      .then((data) => {
        setAlternatif(data); // Mengatur state alternatif dengan data yang diterima dari getAll
        setRestart(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [restart]);

  const getById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/alternatives/${id}`
      );
      setUbah({
        ...ubah,
        name: response.data.payload.datas.name,
        code: response.data.payload.datas.code,
        id: id,
      });
    } catch (error) {
      throw new Error("There was a problem fetching the data:", error);
    }
  };

  const handleCreate = () => {
    create(tambah)
      .then((data) => {
        if (data.payload.status_code === 200) {
          setRestart(true);
          Swal.fire({
            icon: "success",
            title: "Data berhasil ditambahkan",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (id) => {
    update(id, ubah)
      .then((data) => {
        if (data.payload.status_code === 200) {
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah yakin akan dihapus ?",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        delele(id).then((data) => {
          if (data.payload.status_code === 200) {
            setRestart(true);
            Swal.fire({
              icon: "success",
              title: "Data berhasil dihapus",
              confirmButtonText: "OK",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Aside />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar name="Alternatif" />
        <div className="card mt-3 mx-4">
          <div className="bg-gradient-default rounded-top pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="px-3 fw-bold">Data Alternatif</h4>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button
                  className="btn bg-gradient-info btn-sm mx-3 mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#createModal"
                >
                  tambah
                </button>
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
                    Kode Alternatif
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
                        <p className="text-xs font-weight-bold mb-0">
                          {data.code}
                        </p>
                      </td>
                      <td>
                        <span className="badge badge-dot me-4">
                          <i className="bg-info" />
                          <span className="text-dark text-xs">{data.name}</span>
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <div className="">
                          <button
                            type="button"
                            className="btn bg-gradient-warning btn-sm mt-3 mx-2"
                            style={{ fontSize: 10 }}
                            data-bs-toggle="modal"
                            data-bs-target="#updateModal"
                            onClick={() => {
                              getById(data.id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn bg-gradient-danger btn-sm mt-3 "
                            style={{ fontSize: 10 }}
                            onClick={() => handleDelete(data.id)}
                          >
                            Hapus
                          </button>
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

      {/* <!-- Modal Tambah --> */}
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
                        Tambah Data
                      </h3>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-end ">
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
                    <label>Kode Alternatif</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={tambah.code}
                        onChange={(e) =>
                          setTambah({ ...tambah, code: e.target.value })
                        }
                      />
                    </div>
                    <label>Nama Alternatif</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={tambah.name}
                        onChange={(e) =>
                          setTambah({ ...tambah, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                        onClick={handleCreate}
                        disabled={
                          tambah.name === "" || tambah.code === ""
                            ? true
                            : false
                        }
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

      {/* <!-- Modal Update --> */}
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
                        Update Data
                      </h3>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-end ">
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
                    <label>Kode Alternatif</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={ubah.code}
                        onChange={(e) =>
                          setUbah({ ...ubah, code: e.target.value })
                        }
                      />
                    </div>
                    <label>Nama Alternatif</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={ubah.name}
                        onChange={(e) =>
                          setUbah({ ...ubah, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0"
                        onClick={() => handleUpdate(ubah.id)}
                        disabled={
                          ubah.name === "" || ubah.code === "" ? true : false
                        }
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

export default Alternative;
