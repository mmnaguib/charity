import React from "react";
import AzkarList from "./AzkarList";
import AzkarApi from "../../services/azkarApi";

const Sleeping = () => {
  return (
    <AzkarList
      fetchAzkar={AzkarApi.getSleepingAzkar}
      listKey="sleeping"
      title="أذكار النوم"
    />
  );
};

export default Sleeping;
