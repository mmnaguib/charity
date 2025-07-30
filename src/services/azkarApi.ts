import axios from "axios";

const AzkarApi = {
  getMoriningAzkar: async () => {
    return await axios.get(
      "https://raw.githubusercontent.com/mmnaguib/azkar/main/morning.json"
    );
  },
  getNightAzkar: async () => {
    return await axios.get(
      "https://raw.githubusercontent.com/mmnaguib/azkar/main/night.json"
    );
  },
  getSleepingAzkar: async () => {
    return await axios.get(
      "https://raw.githubusercontent.com/mmnaguib/azkar/main/sleeping.json"
    );
  },
  getAfterPrayAzkar: async () => {
    return await axios.get(
      "https://raw.githubusercontent.com/mmnaguib/azkar/main/afterPray.json"
    );
  },
};

export default AzkarApi;
