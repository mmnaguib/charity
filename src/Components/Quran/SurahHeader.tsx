export interface IProps {
  name: string;
  enName: string;
  surahNumbers: number;
  place: string;
  positionFrom: number;
  positionTo: number;
}
export const SurahHeader = (props: IProps) => {
  return (
    <div>
      <h3>معلومات عن : {props.name}</h3>
      <div className="headerContent">
        <div>
          <span> عدد آيات {props.name} : </span>
          <span> {props.surahNumbers} </span>
        </div>
        <div>
          <span>مكان النزول : </span>
          <span>{props.place}</span>
        </div>
        <div>
          <span>الاسم بالانجليزي : </span>
          <span>{props.enName}</span>
        </div>
        <div>
          <span> موضعها في القرآن : </span>
          <span>
            من {props.positionFrom} الي {props.positionTo}
          </span>
        </div>
      </div>
    </div>
  );
};
