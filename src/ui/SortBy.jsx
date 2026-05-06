/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const sortUrl = searchParams.get("sortBy") || "";

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={sortUrl}
      type="white"
    />
  );
}

export default SortBy;
