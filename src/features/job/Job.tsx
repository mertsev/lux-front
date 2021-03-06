import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteJobAs, fetchJob, selectJob } from "./jobSlice";
import styles from "./Job.module.css";
import { Link, useParams } from "react-router-dom";

export function Job(): JSX.Element {
  const job = useSelector(selectJob);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(fetchJob(id));
    } else {
      console.log("nope");
    }
  }, []);
  //console.log(id);
  return (
    <div>
      {job._id === "none" ? (
        <div>Job does not exist</div>
      ) : (
        <div>
          <div className={styles.card}>
            <div className={styles.card}>Id: {job._id}</div>
            <div className={styles.card}>Name: {job.jobName}</div>
            <div className={styles.card}>
              deviceId:{" "}
              <Link to={{ pathname: `/appliance/view/${job._id}` }}>
                {job.deviceId}
              </Link>
            </div>
            <div className={styles.card}>startTime: {job.startTime}</div>
            <div className={styles.card}>endTime: {job.endTime}</div>
            {/* {job.powerState ? (
              <span className={styles.card}>Power: On</span>
            ) : (
              <span className={styles.card}>Power: Off</span>
            )} */}
          </div>
          <div>
            <Link to={{ pathname: `/job/edit/${job._id}` }}>
              <button type="button">Edit job</button>
            </Link>

            <button
              type="button"
              onClick={() => dispatch(deleteJobAs(job._id))}
            >
              Delete job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
