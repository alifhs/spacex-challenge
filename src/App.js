import { useState, useEffect } from "react";
import { Card } from "./components/card";
import { Search } from "./components/search";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "./store/reducers/LaunchDataReducer";
// import moment from "moment";
import { Filter } from "./components/filter";

function App() {

  const dispatch = useDispatch();

  const launchData = useSelector((state) => state.launchData.data);
  // const filterName = useSelector((state) => state.launchData.filterName);
  const isLoading = useSelector(state => state.launchData.isLoading);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [optionState, setOptionState] = useState("empty");

  const filters = { setFailure, setSuccess, setUpcoming, setOptionState, upcoming , failure, success, optionState};
  return (
    <div className="mx-auto pt-10 bg-gray-100 min-h-screen ">
      <Search  filters = {filters} />
      <Filter filters= {filters} />
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        launchData.length > 0 ? (
          <div className="flex justify-center pt-16">
          <div className=" grid grid-cols-3 gap-4 ">
            {launchData.map((flight, index) => {
              return <Card key={index} flight={flight} />;
            })}
          </div>
        </div>
        ) : (
          <h1 className="text-6xl text-center mx-auto mt-32">No Data Available....Try Other Filters</h1>
        )
       
      )}
    </div>
  );
}

export default App;
