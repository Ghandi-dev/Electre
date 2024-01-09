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

const RadarChart = ({ data }) => {
  return (
    <div className="card mx-4">
      <div className="row justify-content-center my-4">
        {data.map((alternatif, index) => {
          const aggregatedValues = {};

          alternatif.values.forEach((value) => {
            if (!aggregatedValues[value.criteriaCode]) {
              aggregatedValues[value.criteriaCode] = {
                total: value.nilai,
                count: 1,
              };
            } else {
              aggregatedValues[value.criteriaCode].total += value.nilai;
              aggregatedValues[value.criteriaCode].count++;
            }
          });

          const labels = Object.keys(aggregatedValues);
          const dataValues = labels.map(
            (label) =>
              aggregatedValues[label].total / aggregatedValues[label].count
          );

          const chartData = {
            labels,
            datasets: [
              {
                label: alternatif.name,
                data: dataValues,
                borderColor:
                  "#" + (Math.random().toString(16) + "000000").substring(2, 8),
                borderWidth: 2,
              },
            ],
          };

          return (
            <div key={index} className="col-2 text-center">
              <h3>{alternatif.name}</h3>
              <Radar data={chartData} options={{ scale: { max: 5, min: 0 } }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadarChart;
