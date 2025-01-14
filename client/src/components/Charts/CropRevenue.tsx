import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface cropRevenueprops {
  cropRevenue: {
    cropType: string;
    revenue: number;
  }[];
}

const CropRevenue = ({ cropRevenue }: cropRevenueprops) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={cropRevenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cropType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CropRevenue;
