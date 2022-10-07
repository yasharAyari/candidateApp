import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { SortKeys, SortOrder } from "../../interfaces";
import Styles from './sortIcon.module.css'

interface SortIconProps {
  sortOrder: SortOrder
  columnKey: SortKeys
  sortKey: SortKeys
}

const SortIcon = ({
  sortOrder,
  columnKey,
  sortKey,
}: SortIconProps) => {
  if(sortKey === columnKey) {
    return (
      <span
        className={`${Styles.sortIcon} ${
          sortKey === columnKey && sortOrder === "desc"
            ? Styles.sortReverse
            : ""
        }`}
        data-testid="arrowUp"
      >
       <FontAwesomeIcon icon={faArrowUp} />
      </span>
    );
  }
  return <span className={Styles.sortIcon} data-testid="arrowUpDown"><FontAwesomeIcon icon={faArrowsUpDown} /></span>
}

export default SortIcon
