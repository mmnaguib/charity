import axios from "axios";
import { useEffect, useState } from "react";

export interface CalendarDate {
  date?: string;
  day?: string;
  month?: {
    en?: string;
    ar?: string;
  };
  year?: string;
  weekday?: {
    en?: string;
    ar?: string;
  };
}

interface DateCardProps {
  gregorian?: CalendarDate;
  hijri?: CalendarDate;
}

const DateCard: React.FC<DateCardProps> = () => {
  const [gregorian, setGregorian] = useState<CalendarDate | null>(null);
  const [hijri, setHijri] = useState<CalendarDate | null>(null);
  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const url = `https://api.aladhan.com/v1/gToH/${formattedDate}`;

    axios.get(url).then((res) => {
      setGregorian(res.data.data.gregorian);
      setHijri(res.data.data.hijri);
    });
  }, []);
  return (
    <div className="date-container">
      <div className="date-card gregorian">
        <i className="fa fa-calendar date-icon" />
        <p className="date-title">التاريخ الميلادي</p>
        <p className="date-main">{gregorian?.date}</p>
        <p className="date-details">
          {gregorian?.day} {gregorian?.month?.en} {gregorian?.year}
        </p>
        <p className="date-weekday">{gregorian?.weekday?.en}</p>
      </div>

      <div className="date-card hijri">
        <i className="fa fa-calendar date-icon" />
        <p className="date-title">التاريخ الهجري</p>
        <p className="date-main">{hijri?.date}</p>
        <p className="date-details">
          {hijri?.day} {hijri?.month?.ar} {hijri?.year}
        </p>
        <p className="date-weekday">{hijri?.weekday?.ar}</p>
      </div>
    </div>
  );
};

export default DateCard;
