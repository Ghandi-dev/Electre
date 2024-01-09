import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alternative from "./pages/Alternative";
import Criteria from "./pages/Criteria";
import SubCriteria from "./pages/SubCriteria";
import InsertValue from "./pages/InsertValue";
import Calculation from "./pages/Calculation";
import FinalResult from "./pages/FinalResult";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alternatif" element={<Alternative />} />
          <Route path="/criteria" element={<Criteria />} />
          <Route path="/subcriteria" element={<SubCriteria />} />
          <Route path="/insertvalue" element={<InsertValue />} />
          <Route path="/calculation" element={<Calculation />} />
          <Route path="/final" element={<FinalResult />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
