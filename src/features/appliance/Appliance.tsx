import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteApplianceAs,
  fetchAppliance,
  selectAppliance,
} from "./applianceSlice";
import styles from "./Appliance.module.css";
import { Link, useParams } from "react-router-dom";
import { JobList } from "../jobList/JobList";

export function Appliance(): JSX.Element {
  const appliance = useSelector(selectAppliance);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(fetchAppliance(id));
    } else {
      console.log("nope");
    }
  }, []);
  //console.log(id);
  return (
    <div>
      {appliance._id === "none" ? (
        <div>Appliance does not exist</div>
      ) : (
        <div>
          <div className={styles.card}>
            <span className={styles.card}>Id: {appliance._id}</span>
            <span className={styles.card}>Name: {appliance.deviceName}</span>
            {appliance.powerState ? (
              <span className={styles.card}>Power: On</span>
            ) : (
              <span className={styles.card}>Power: Off</span>
            )}
          </div>
          <div>
            <Link to={{ pathname: `/appliance/edit/${appliance._id}` }}>
              <button type="button">Edit appliance</button>
            </Link>

            <button
              type="button"
              onClick={() => dispatch(deleteApplianceAs(appliance._id))}
            >
              Delete appliance
            </button>
            <Link to={{ pathname: `/job/create/${appliance._id}` }}>
              <button type="button">Create Job for appliance</button>
            </Link>
          </div>
        </div>
      )}
      <JobList />
    </div>
  );
}
