import { useEffect, useState } from "react";
import { Field } from "./FarmerHome";
import { getFields } from "../../api/field";
import CropChart from "../Charts/CropChart";
import Card from "../sharedComp/Card";
import FieldRevenue from "../Charts/FieldRevenue";
import { acresToSqm } from "../../utils/constants";
import dayjs from "dayjs";
import HarvestDuration from "../Charts/HarvestDuration";
import CropRevenue from "../Charts/CropRevenue";
import SoilDistribution from "../Charts/SoilDistribution";
import ProfitDiff from "../Charts/ProfitDiff";
import FieldLocation from "../Charts/FieldLocation";

const FarmerDashboard = () => {
  const [fields, setFields] = useState<Field[] | []>([]);

  useEffect(() => {
    getAllFields();
  }, []);

  const getAllFields = async () => {
    try {
      const items = await getFields();
      const { fields } = items.data;
      setFields(fields);
    } catch (error) {
      console.log(error);
    }
  };

  //   this is for crop distribution
  const generateCropTypeData = (fields: Field[]) => {
    if (!fields || fields.length === 0) {
      return [];
    }

    const cropCount = fields?.reduce<Record<string, number>>((acc, field) => {
      acc[field.cropType] = (acc[field.cropType] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(cropCount).map((cropType) => ({
      name: cropType,
      value: cropCount[cropType],
    }));
  };

  const cropData = generateCropTypeData(fields);

  //   field revenue
  const fieldRevenue = fields?.map((field) => ({
    x: acresToSqm(Number(field.fieldArea)),
    y: Number(field.revenue),
  }));

  //   harvest duration
  const harvestDuration = fields?.map((field) => ({
    name: field.fieldName,
    planting: dayjs(field.plantingDate).format("YYYY-MM-DD"),
    harvesting: dayjs(field.harvestingDate).format("YYYY-MM-DD"),
  }));

  //   revenue by crops
  const aggregateRevenueByCrop =
    fields?.reduce((acc, field) => {
      if (acc[field.cropType]) {
        acc[field.cropType] += Number(field.revenue);
      } else {
        acc[field.cropType] = Number(field.revenue);
      }
      return acc;
    }, {} as { [key: string]: number }) || {};

  const cropRevenue = Object.keys(aggregateRevenueByCrop).map((cropType) => ({
    cropType,
    revenue: aggregateRevenueByCrop[cropType],
  }));

  // Soil Data
  const aggregateSoilTypes =
    fields?.reduce((acc: { [key: string]: number }, field: Field) => {
      acc[field.soilType] = (acc[field.soilType] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }) || {};

  const soilData = Object.keys(aggregateSoilTypes).map((soilType) => ({
    soilType,
    value: aggregateSoilTypes[soilType],
  }));

  //   profit of the fields
  const ProfitData = fields?.map((field: Field) => ({
    fieldName: field.fieldName,
    inputCost: field.inputCost,
    revenue: field.revenue,
    profit: Number(field.revenue) - Number(field.inputCost),
  }));

  // fields by common location
  const locationCounts: { location: string; count: number }[] = fields?.reduce(
    (acc, field) => {
      const existingLocation = acc.find(
        (item) => item.location === field.location
      );
      if (existingLocation) {
        existingLocation.count += 1;
      } else {
        acc.push({ location: field.location, count: 1 });
      }
      return acc;
    },
    [] as { location: string; count: number }[]
  );

  if (!fields) {
    return (
      <div className="flex-1 h-full p-6 text-xl font-bold center">
        No data available yet
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
      <div>
        <h1 className="hidden text-xl font-semibold md:text-3xl md:font-bold md:block">
          Track, Manage, and Improve – A Complete Overview of Your Fields
        </h1>
        <h1 className="block text-xl font-semibold md:text-3xl md:font-bold md:hidden">
          Your Farm, One Dashboard
        </h1>
      </div>
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        <div className="flex flex-col w-full gap-6 md:flex-row">
          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Crops Distribution
            </h3>
            <CropChart cropData={cropData} />
          </Card>

          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Revenue per field
            </h3>
            <FieldRevenue scatterData={fieldRevenue} />
          </Card>
        </div>
        <div className="flex flex-col w-full gap-6 md:flex-row">
          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Harvest Duration
            </h3>
            <ProfitDiff ProfitData={ProfitData} />
          </Card>

          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Revenue per crops
            </h3>
            <CropRevenue cropRevenue={cropRevenue} />
          </Card>
        </div>
        <div className="flex flex-col w-full gap-6 md:flex-row">
          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Soil Distribution
            </h3>
            <SoilDistribution soilData={soilData} />
          </Card>

          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Investment vs Profit
            </h3>

            <HarvestDuration harvestDuration={harvestDuration} />
          </Card>
        </div>
        <div className="flex flex-col w-full gap-6 md:flex-row">
          <Card>
            <h3 className="text-xl font-bold underline gradient-txt">
              Field Locations
            </h3>
            <FieldLocation locationCounts={locationCounts} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
