import Pageloader from "../Loaders/Pageloader";
import { getFields } from "../../api/field";
import { useEffect, useState } from "react";
import { Field } from "./FarmerHome";
import getAiInsight from "../../api/aiInsight";
import AIResponseRenderer from "./AiResponse";

const AiSimulation = () => {
  const [fields, setFields] = useState<Field[] | []>([]);
  const [response, setResponse] = useState("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllFields();
  }, []);

  const getAllFields = async () => {
    try {
      setisLoading(true);
      const items = await getFields();
      const { fields } = items.data;
      setFields(fields);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleAskAi = async (id: string) => {
    try {
      setisLoading(true);
      const items = await getAiInsight(id);
      const { insights } = items.data;
      setResponse(insights);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 px-6 py-4 overflow-y-auto md:py-7 md:pb-4 md:gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-3xl md:font-bold md:block">
          AI Predictions for Soil and Crop Health
        </h1>
        {response && (
          <button
            onClick={() => setResponse("")}
            className="px-4 py-2 text-xs border rounded-md md:text-sm center border-border hover:bg-border"
          >
            Go back
          </button>
        )}
      </div>
      <h1 className="text-lg font-medium gradient-txt">
        Select a Field and Click 'Get Insights' to Analyze Soil and Crop Health
      </h1>
      {isLoading && <Pageloader />}
      {!response ? (
        <div className="flex-1 px-8 py-8 overflow-auto rounded-md shadow-card">
          <table className="w-full table-auto">
            <thead className="text-fuchsia-200">
              <tr>
                <th className="px-4 text-left">S.No</th>
                <th className="px-4 text-left">Field Name</th>
                <th className="px-4 text-left">Location</th>
                <th className="px-4 text-left">Crop Type</th>
                <th className="px-4 text-left">Field Type</th>
                <th className="px-4 text-left">Crop Health</th>
                <th className="px-4 text-left">Get Insights</th>
              </tr>
            </thead>
            <tbody>
              {fields?.map(
                (
                  { fieldName, location, cropType, soilType, cropHealth, _id },
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
                    <td className="px-4 py-2">{cropType}</td>
                    <td className="px-4 py-2">{soilType}</td>
                    <td className="px-4 py-2">{cropHealth}</td>
                    <td className="px-4 py-2">
                      <button
                        className="btn bg-btnClr"
                        onClick={() => handleAskAi(_id)}
                      >
                        Go AI
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <AIResponseRenderer response={response} />
      )}
    </div>
  );
};

export default AiSimulation;
