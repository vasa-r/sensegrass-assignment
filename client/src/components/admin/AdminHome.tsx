import StatContainer from "../sharedComp/StatContainer";
import { useEffect, useState } from "react";
import { FieldType } from "../farmer/CreateField";
import { getAllFields } from "../../api/field";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export interface Field extends FieldType {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const AdminHome = () => {
  const [fields, setFields] = useState<Field[] | []>([]);

  useEffect(() => {
    getFields();
  }, []);

  const getFields = async () => {
    try {
      const items = await getAllFields();
      const { fields } = items.data;
      setFields(fields);
    } catch (error) {
      console.log(error);
    }
  };

  const totalRevenue = fields?.reduce(
    (total, curr) => total + Number(curr.revenue),
    0
  );

  const uniqueCrops = fields?.reduce((acc: string[], field) => {
    return acc.includes(field.cropType) ? acc : [...acc, field.cropType];
  }, []).length;

  // Function to aggregate revenue by crop type
  const aggregateRevenueByCrop = (fields: Field[]): Record<string, number> => {
    return fields.reduce((acc, field) => {
      const cropType = field.cropType;
      const revenue = Number(field.revenue);

      if (acc[cropType]) {
        acc[cropType] += revenue;
      } else {
        acc[cropType] = revenue;
      }
      return acc;
    }, {} as Record<string, number>);
  };

  const cropRevenueData = Object.entries(aggregateRevenueByCrop(fields)).map(
    ([cropType, revenue]) => ({
      cropType,
      revenue,
    })
  );

  return (
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:gap-6">
      <div>
        <h1 className="text-xl font-semibold underline md:text-3xl md:font-bold">
          Home
        </h1>
      </div>
      <StatContainer
        first={fields?.length}
        second={uniqueCrops}
        third={totalRevenue}
      />{" "}
      <div style={{ textAlign: "center" }}>
        <h3>Crop Revenue Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={cropRevenueData}
            dataKey="revenue"
            nameKey="cropType"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {cropRevenueData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminHome;
