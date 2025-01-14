import { useEffect, useState } from "react";
import { getAllFields } from "../../api/field";
import { Link } from "react-router-dom";

const AdminFields = () => {
  const [fields, setFields] = useState([]);

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

  return (
    <>
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold underline md:text-3xl md:font-bold md:block">
            Users in Farmlytics
          </h1>
        </div>
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-xl">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Field Name</th>
                <th className="px-4 text-left">Location</th>
                <th className="px-4 text-left">Harvest Date</th>
                <th className="px-4 text-left">Crop Type</th>
                <th className="px-4 text-left">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {fields?.map(
                (
                  {
                    fieldName,
                    location,
                    harvestingDate,
                    cropType,
                    revenue,
                    _id,
                  },
                  index
                ) => (
                  <tr
                    key={_id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "" : "",
                    }}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{fieldName}</td>
                    <td className="px-4 py-2">{location}</td>
                    <td className="px-4 py-2">{harvestingDate}</td>
                    <td className="px-4 py-2">{cropType}</td>
                    <td className="px-4 py-2">{revenue}</td>
                    <td>
                      <Link
                        to={`/admin/${_id}`}
                        className="underline hover:text-lightPur underline-offset-2"
                      >
                        Show more
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminFields;
