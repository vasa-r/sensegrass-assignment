import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getField } from "../../api/field";
import PageLoader from "../Loaders/PageLoader";
import { Field } from "./FarmerHome";

const FieldDetails = () => {
  const [field, setField] = useState<Field>();
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) getFieldDetail();
  }, [id]);

  const getFieldDetail = async () => {
    try {
      setisLoading(true);
      const items = await getField(id!);
      const { fields } = items.data;
      setField(fields);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:gap-6">
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="max-w-3xl p-6 mx-auto rounded-lg shadow-md bg-main-bg">
          <Link
            to="/farmer"
            className="absolute w-24 px-4 py-2 text-xs border rounded-md top-28 md:text-sm center border-border hover:bg-border"
          >
            Go back
          </Link>

          <h1 className="mb-4 text-2xl font-bold gradient-txt">
            Field Details
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Field Name
              </p>
              <p className="text-lg text-white">{field?.fieldName}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Location
              </p>
              <p className="text-lg text-white">{field?.location}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Latitude
              </p>
              <p className="text-lg text-white">{field?.latitude}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Longitude
              </p>
              <p className="text-lg text-white">{field?.longitude}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Crop Type
              </p>
              <p className="text-lg text-white">{field?.cropType}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Field Area
              </p>
              <p className="text-lg text-white">{field?.fieldArea}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Planting Date
              </p>
              <p className="text-lg text-white">{field?.plantingDate}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Harvesting Date
              </p>
              <p className="text-lg text-white">{field?.harvestingDate}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                SoilType
              </p>
              <p className="text-lg text-white">{field?.soilType}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Input Cost
              </p>
              <p className="text-lg text-white">{field?.inputCost}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Revenue
              </p>
              <p className="text-lg text-white">{field?.revenue}</p>
            </div>
            <div className="p-4 rounded-lg shadow-sm bg-main-bg">
              <p className="text-xl font-semibold text-white capitalize">
                Crop Health
              </p>
              <p className="text-lg text-white">{field?.cropHealth}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldDetails;
