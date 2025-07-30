import React, { useEffect, useState } from "react";
import AzkarApi from "../../services/azkarApi";
import { IZekr } from "../../interface";
import AzkarList from "./AzkarList";

const Morning = () => {
  const [azkar, setAzkar] = useState<IZekr[]>([]);

  return (
    <AzkarList
      fetchAzkar={AzkarApi.getMoriningAzkar}
      listKey="morning"
      title="أذكار الصباح"
    />
  );
};

export default Morning;
