/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  const cabinFilterUrl = searchParams.get("discount") || "all";
  // filter
  let filterCabinData;
  if (cabinFilterUrl === "all") filterCabinData = cabins;
  if (cabinFilterUrl === "with-discount") {
    filterCabinData = cabins?.filter((el) => el.discount > 0);
  }
  if (cabinFilterUrl === "no-discount")
    filterCabinData = cabins?.filter((el) => el.discount === 0);

  //sort

  const sortByUrl = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortByUrl.split("-");
  const modifiers = direction === "asc" ? 1 : -1;
  const sortTheCabinData = filterCabinData?.sort(
    (a, b) => (a[field] - b[field]) * modifiers,
  );
  if (!cabins?.length) return <Empty resourceName={"cabins"} />;
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortTheCabinData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />

        {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}
      </Table>
    </Menus>
  );
}
