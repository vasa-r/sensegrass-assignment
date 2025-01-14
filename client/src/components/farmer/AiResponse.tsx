import { useEffect, useState } from "react";
import PageLoader from "../Loaders/Pageloader";

interface ParsedSection {
  title: string;
  items: string[];
}

interface AIResponseProps {
  response: string;
}

const AiResponse = ({ response }: AIResponseProps) => {
  const [parsedResponse, setParsedResponse] = useState<ParsedSection[]>([]);

  useEffect(() => {
    if (response) {
      const sections = response.split("\n\n").filter(Boolean);
      const parsed = sections.map((section) => {
        const [titleLine, ...contentLines] = section
          .split("\n")
          .filter(Boolean);

        const items = contentLines.map((line) =>
          line.replace(/^\*+\s*/, "").trim()
        );

        return {
          title: titleLine.replace(/^\*\*|:\*\*$/g, "").trim(),
          items,
        };
      });
      setParsedResponse(parsed);
    }
  }, [response]);

  return (
    <div className="p-4 text-white rounded shadow-md bg-main-bg">
      {parsedResponse.length > 0 ? (
        parsedResponse.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-xl font-bold">{section.title}</h2>
            <ul className="list-disc list-inside">
              {section.items.map((item, idx) => (
                <li key={idx} className="text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default AiResponse;

// **1. Soil Health:**

// * **Nutrients:** Clay soils can have low nutrient availability, especially phosphorus and potassium, due to strong cation exchange capacity.  Nutrient testing is crucial.
// * **Moisture:** Clay soils retain water well but can become waterlogged, hindering root oxygen uptake and promoting disease. Drainage may be needed.

// **2. Crop Health:**

// * **Pests/Diseases:**  Wheat infection warrants immediate identification of the pathogen (fungus, bacteria, virus) to determine appropriate treatment.
// * **Yield Prediction:**  Severely infected wheat will show significantly reduced yield compared to healthy plants.  The extent of yield loss depends on the infection's severity and stage.

// **3. Recommendations for Improvements:**

// * **Soil Amendment:** Improve soil structure and drainage by incorporating organic matter (compost, manure).
// * **Disease Management:** Implement integrated pest management (IPM) strategies including resistant varieties, targeted fungicides (if identified), and crop rotation.
