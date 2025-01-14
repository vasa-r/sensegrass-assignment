import StatContainer from "../sharedComp/StatContainer";
import Search from "../../assets/search.png";
import Delete from "../../assets/delete.png";
import Edit from "../../assets/edit.png";
import { useCallback, useEffect, useState } from "react";
import CreateField, { FieldType } from "./CreateField";
import { getFields } from "../../api/field";
import DeleteField from "./DeleteField";
import { Link } from "react-router-dom";

export interface Field extends FieldType {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const FarmerHome = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [fields, setFields] = useState<Field[] | []>([]);
  const [mutableId, setMutableId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!showCreateModal) getAllFields();
  }, [showCreateModal]);

  useEffect(() => {
    if (!showEditModal) getAllFields();
  }, [showEditModal]);

  useEffect(() => {
    if (!showDeleteModal) getAllFields();
  }, [showDeleteModal]);

  const getAllFields = async () => {
    try {
      const items = await getFields();
      const { fields } = items.data;
      setFields(fields);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id: string) => {
    setMutableId(id);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setMutableId(id);
    setShowDeleteModal(true);
  };

  const resetId = useCallback(() => {
    setMutableId("");
  }, []);

  const totalRevenue = fields?.reduce(
    (total, curr) => total + Number(curr.revenue),
    0
  );

  const uniqueCrops = fields?.reduce((acc: string[], field) => {
    return acc.includes(field.cropType) ? acc : [...acc, field.cropType];
  }, []).length;

  const filteredFields = fields?.filter((field) =>
    Object.values(field).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {showCreateModal && (
        <CreateField showModal={setShowCreateModal} open={showCreateModal} />
      )}
      {showEditModal && (
        <CreateField
          showModal={setShowEditModal}
          open={showEditModal}
          id={mutableId}
          reset={resetId}
        />
      )}
      {showDeleteModal && (
        <DeleteField
          showModal={setShowDeleteModal}
          open={showDeleteModal}
          id={mutableId}
          reset={resetId}
        />
      )}
      <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:gap-6">
        <div>
          <h1 className="text-xl font-semibold md:text-3xl md:font-bold">
            Seamless Farming, Smarter Results
          </h1>
        </div>
        <StatContainer
          first={fields?.length}
          second={uniqueCrops}
          third={totalRevenue}
        />
        <div className="flex items-center gap-3 px-4 py-4 rounded-md md:px-8 shadow-card">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Add Field
          </button>
          <div className="flex items-center flex-1 border-b-2 border-stone-800">
            <input
              type="text"
              placeholder="Search for fields"
              className="w-full text-lg border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="cursor-pointer w-11">
              <img src={Search} alt="search" className="size-7 md:size-8" />
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Field Name</th>
                <th className="px-4 text-left">Location</th>
                <th className="px-4 text-left">Harvest Date</th>
                <th className="px-4 text-left">Crop Type</th>
                <th className="px-4 text-left">Revenue</th>
                <th className="px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map(
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
                    <td
                      className="px-4 py-2"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={Edit}
                        alt="Edit invoice"
                        onClick={() => handleEdit(_id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                      <img
                        src={Delete}
                        alt="Delete invoice"
                        onClick={() => handleDelete(_id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>
                      <Link
                        to="/"
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

export default FarmerHome;
