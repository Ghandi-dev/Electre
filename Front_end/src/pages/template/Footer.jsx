const Footer = () => {
  return (
    <>
      <footer className="footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            {" "}
            {/* Menggunakan justify-content-center */}
            <div className="col-lg-6 mb-lg-0 mb-4 text-center">
              {" "}
              {/* Menambahkan text-center */}
              <div className="text-muted">
                Dikerjakan dengan <i className="fa fa-heart" /> oleh kelompok 5
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
