import React from "react";
import AzkarList from "./AzkarList";
import AzkarApi from "../../services/azkarApi";

const AfterPray = () => {
  return (
    <AzkarList
      fetchAzkar={AzkarApi.getAfterPrayAzkar}
      listKey="afterPray"
      title="أذكار بعد الصلاة"
    />
  );
};

export default AfterPray;
