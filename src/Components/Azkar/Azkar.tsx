import { useMemo, useState } from "react";
import Morning from "./Morning";
import Night from "./Night";
import Sleeping from "./Sleeping";
import AfterPray from "./AfterPray";
import Tasbih from "./Tasbih";

const Azkar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = useMemo(
    () => [
      { title: "أذكار الصباح", component: <Morning /> },
      { title: "أذكار المساء", component: <Night /> },
      { title: "أذكار النوم", component: <Sleeping /> },
      { title: "أذكار بعد الصلاه", component: <AfterPray /> },
      { title: "تسبيح", component: <Tasbih /> },
    ],
    []
  );

  return (
    <>
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}
        >
          {tabs.map((tab, index) => (
            <button
              className="azkarTab"
              key={index}
              style={{
                backgroundColor: selectedTab === index ? "#fff" : "#f0f0f0",
                borderBottom: selectedTab === index ? 0 : "1px solid #ccc",
              }}
              onClick={() => setSelectedTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mainWidth">{tabs[selectedTab].component}</div>
      </div>
    </>
  );
};

export default Azkar;
