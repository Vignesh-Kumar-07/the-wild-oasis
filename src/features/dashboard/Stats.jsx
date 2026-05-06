/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numOfDays, cabinCount }) {
  // 1.
  const numOfBookings = bookings?.length;
  // 2.
  const sales = bookings?.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);
  // 3.
  const checkins = confirmedStays?.length;
  // 4.
  // num checked in nights / num of days * num of cabins
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur?.numNights, 0) /
    (numOfDays * cabinCount);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numOfBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Check ins"
        value={checkins}
        color="blue"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={`${Math.round(occupation * 100)}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
