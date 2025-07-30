import React from "react";
import AzkarList from "./AzkarList";
import AzkarApi from "../../services/azkarApi";

const Night = () => {
  return (
    <AzkarList
      fetchAzkar={AzkarApi.getNightAzkar}
      listKey="night"
      title="أذكار المساء"
    />
  );
};

export default Night;
