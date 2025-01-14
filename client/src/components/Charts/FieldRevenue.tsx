import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
  ReferenceLine,
} from "recharts";

interface FieldRevenueProps {
  scatterData: {
    x: number;
    y: number;
  }[];
}

const FieldRevenue = ({ scatterData }: FieldRevenueProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="Field Area (sq.m)" unit="m²" />
        <YAxis dataKey="y" name="Revenue (₹)" unit="₹" />
        <ZAxis dataKey="z" range={[10, 100]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <ReferenceLine />
        <Legend />
        <Scatter
          name="Fields"
          data={scatterData}
          fill="#8884d8"
          shape="circle"
          line
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default FieldRevenue;
