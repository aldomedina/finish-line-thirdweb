import { TAttribute } from "@/types";
import s from "./style.module.scss";
import classNames from "classnames";

const AttributesTable: React.FC<{ attributes: TAttribute[] }> = ({
  attributes,
}) => {
  return (
    <table className={s.table}>
      <tbody>
        {attributes.map((el) => (
          <tr key={JSON.stringify(el)} className={s.row}>
            <td className={classNames(s.cell, s.trait)}>{el.trait_type}</td>
            <td className={classNames(s.cell, s.value)}>{el.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttributesTable;
