import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface HarvestDurationProps {
  harvestDuration: {
    name: string;
    planting: string;
    harvesting: string;
  }[];
}

const HarvestDuration = ({ harvestDuration }: HarvestDurationProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={harvestDuration}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="planting"
          name="Planting Date"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="harvesting"
          name="Harvesting Date"
          stroke="#82ca9d"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HarvestDuration;
