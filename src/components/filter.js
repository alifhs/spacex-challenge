import { useState, useEffect } from "react";
// import { Card } from "./card";
// import { Search } from "./components/search";

import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../store/reducers/LaunchDataReducer";
import moment from "moment";



 export const Filter = ({filters})=> {
     const { setFailure, setSuccess, setUpcoming, setOptionState,optionState, upcoming, failure, success } = filters;
    const filterName = useSelector((state) => state.launchData.filterName);

    const dispatch = useDispatch();
    
    const onChange = (e) => {
        let start;
        let end;
        switch (e.target.value) {
          case "last-week":
            setFailure(false);
            setSuccess(false);
            setUpcoming(false);
            start = moment()
              .subtract(1, "weeks")
              .startOf("week")
              .format("YYYY-MM-DD");
            end = moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD");
            dispatch(
              changeFilter({
                filterName: "last week",
                payload: `?start=${start}&end=${end}`,
              })
            );
            setOptionState(e.target.value);
            // logout({ returnTo: window.location.origin });
            break;
          case "last-month":
            setFailure(false);
            setSuccess(false);
            setUpcoming(false);
            start = moment()
              .subtract(1, "months")
              .startOf("month")
              .format("YYYY-MM-DD");
            end = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            dispatch(
              changeFilter({
                filterName: "last month",
                payload: `?start=${start}&end=${end}`,
              })
            );
            setOptionState(e.target.value);
            break;
          case "last-year":
            setFailure(false);
            setSuccess(false);
            setUpcoming(false);
            start = moment()
              .subtract(1, "years")
              .startOf("year")
              .format("YYYY-MM-DD");
            end = moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD");
            dispatch(
              changeFilter({
                filterName: "last year",
                payload: `?start=${start}&end=${end}`,
              })
            );
            setOptionState(e.target.value);
            break;
          default:
            dispatch(
              changeFilter({
                filterName: "",
                payload: ``,
              })
            );
            setOptionState("empty");
    
          // setOption(e.target.value);
        }
      };
    
      //upcoming
    
      const onUpcomingChange = (e) => {
        setFailure(false);
        setSuccess(false);
        setOptionState("empty");
        if (!upcoming) {
          dispatch(
            changeFilter({
              filterName: "upcoming launch",
              payload: `/upcoming`,
            })
          );
          setUpcoming(!upcoming);
        } else {
          dispatch(
            changeFilter({
              filterName: "",
              payload: ``,
            })
          );
          setUpcoming(false);
        }
      };
    
      //success failure
      const onSuccessChange = (e) => {
        setUpcoming(false);
        setOptionState("empty");
        if (failure) {
          setFailure(!failure);
          setSuccess(!success);
    
          dispatch(
            changeFilter({
              filterName: "successful launch",
              payload: `?launch_success=${!success}`,
            })
          );
        } else if (success) {
          setSuccess(!success);
          dispatch(
            changeFilter({
              filterName: "",
              payload: ``,
            })
          );
        } else {
          //when success is false
          setSuccess(!success);
          dispatch(
            changeFilter({
              filterName: "successful launch",
              payload: `?launch_success=${!success}`,
            })
          );
        }
      };
      const onFailureChange = (e) => {
        setUpcoming(false);
        setOptionState("empty");
        if (success) {
          setSuccess(!success);
          setFailure(!failure);
          dispatch(
            changeFilter({
              filterName: "failed launch",
              payload: `?launch_success=false`,
            })
          );
        } else if (failure) {
          setFailure(!failure);
          dispatch(
            changeFilter({
              filterName: "",
              payload: ``,
            })
          );
        } else {
          setFailure(!failure);
          dispatch(
            changeFilter({
              filterName: "failed launch",
              payload: `?launch_success=false`,
            })
          );
        }
      };


    return (
        <div className="flex items-center justify-center mt-10 space-x-12 ">
        {" "}
        {
          <h4 className=" text-blue-400 ">
            {" "}
            <strong>#</strong>
            {filterName === ""
              ? "no filters applied"
              : `filtered by ${filterName}`}{" "}
          </h4>
        }{" "}
        <div className="flex   items-center">
          {" "}
          <input
            checked={success}
            onChange={onSuccessChange}
            type="checkbox"
            id="success"
            name="success"
            value="success"
            className="relative "
          />
          <label className="relative  left-1" for="checkbox">
            successful
          </label>
        </div>
        <div className="flex   items-center">
          {" "}
          <input
            checked={failure}
            type="checkbox"
            onChange={onFailureChange}
            id="failure"
            name="failure"
            value="failure"
            className="relative "
          />
          <label className="relative  left-1" for="checkbox">
            failed
          </label>
        </div>
        <div className="flex relative  items-center">
          {" "}
          <input
            checked={upcoming}
            onChange={onUpcomingChange}
            type="checkbox"
            id="upcoming"
            name="upcoming"
            value="upcoming"
            className="relative "
          />
          <label className="relative left-1" for="checkbox">
            upcoming
          </label>
        </div>
        <div className="">
          <label for="cars">Filter By Date: </label>
          <select
            name="launch_status"
            onChange={onChange}
            value={optionState}
            className="bg-white  outline-none shadow-inner"
          >
            <option value="empty">Select</option>
            <option value="last-week">Last Week</option>

            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>
      </div>
    )
}