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

interface FieldLocationProps {
  locationCounts: {
    location: string;
    count: number;
  }[];
}

const FieldLocation = ({ locationCounts }: FieldLocationProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={locationCounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" name={"Fields"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FieldLocation;
