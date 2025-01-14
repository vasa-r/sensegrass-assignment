import { useEffect, useState } from "react";
import PageLoader from "../Loaders/PageLoader";

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
