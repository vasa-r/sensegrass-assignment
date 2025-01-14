import React from "react";
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

interface ProfitDiffProps {
  ProfitData: {
    fieldName: string;
    inputCost: string;
    revenue: string;
    profit: number;
  }[];
}

const ProfitDiff = ({ ProfitData }: ProfitDiffProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ProfitData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fieldName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inputCost" fill="#ff7300" name="Investment" />
        <Bar dataKey="revenue" fill="#387908" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfitDiff;
