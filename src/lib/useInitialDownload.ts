import { useEffect, useState } from "react";
import { db } from "./firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import axios from "axios";
import { mockActivities, mockAthlete } from "../mockData2";
import { toast } from "react-hot-toast";

export interface DownloadHookType {
  modalUserLoadProgress: number;
  setModalUserLoadProgress: Function;
  modalActivityLoadProgress: number;
  setModalActivityLoadProgress: Function;
  modalFinalLoadProgress: number;
  setModalFinalLoadProgress: Function;
}
export default function useInitialDownload(
  userHook: any,
  setModalOpen: Function
) {
  // State
  const [modalUserLoadProgress, setModalUserLoadProgress] = useState(0);
  const [modalActivityLoadProgress, setModalActivityLoadProgress] = useState(0);
  const [modalFinalLoadProgress, setModalFinalLoadProgress] = useState(0);

  // TODO: Problem, if token expires, the userObject that is updated does not contain athlete information, can't use athleteID from there. Need a sep obj for athlete info
  let athleteID = userHook?.userObject?.athlete?.id || 28739325;
  let userDoc = db.collection("athletes").doc(athleteID.toString());
  const [usernameValue, usernameLoading, usernameError] =
    useDocumentData<any>(userDoc);

  // On page load, perform initial setup/download sequence
  useEffect(() => {
    // DEV MODE
    if (
      process.env.REACT_APP_ENV === "DEV" &&
      process.env.REACT_APP_DOWNLOAD === "TRUE" &&
      usernameLoading === false
    ) {
      setModalOpen(true);
      // a Get user metadata from mock
      const userData = mockAthlete;

      // b Get all activities, put in an array
      const activities = mockActivities;
      //  Perform actions to modal data component

      // Perform actions to modal data component
      let count = 0;
      let lastCount = -1;
      const delay = (ms: number, count: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(count + 1);
          }, ms);
        });
      };

      const delayLoad = async () => {
        while (count <= 200) {
          if (count <= 100 && count > lastCount) {
            setModalUserLoadProgress(count);
            lastCount = count;
            count = <number>await delay(5, count);
          } else if (count > lastCount) {
            setModalActivityLoadProgress(Math.floor(count / 2));
            lastCount = count;
            count = <number>await delay(5, count);
          }
        }
        setModalFinalLoadProgress(100);
        toast.success("Initial download complete!");
      };
      delayLoad();
    }
    // PRODUCTION MODE
    else {
      // 1 Check db for user id

      // If user id does not exist, or downloadDate is not a value, begin download data sequence
      // Get athlete stats
      if (!usernameValue && !usernameLoading && !usernameError && !userHook?.demoMode) {
        setModalOpen(true);
        // 2 Download user data
        const getUserData = async () => {
          try {
            const batch = db.batch();
            // Get user metadata from strava (name, location, etc.)
            setModalUserLoadProgress(25);
            let axiosRequestConfig = {
              method: "get",
              url: `https://www.strava.com/api/v3/athlete`,
              headers: {
                Authorization: `Bearer ${userHook?.userObject?.access_token}`,
              },
            };
            const { data } = await axios(axiosRequestConfig);
            // const athleteID = userHook?.userObject?.athlete?.id;
            const athleteID = data?.id;

            // Get athlete stats for use in activities loading bar
            let axiosRequestConfig2 = {
              method: "get",
              url: `https://www.strava.com/api/v3//athletes/${athleteID}/stats`,
              headers: {
                Authorization: `Bearer ${userHook?.userObject?.access_token}`,
              },
            };
            const response2 = await axios(axiosRequestConfig2);
            const athleteStats = response2.data;
            const runTotal = athleteStats?.all_run_totals;

            // Update modal progress
            setModalUserLoadProgress(50);

            // Batch add the user to the db
            batch.set(db.collection("athletes").doc(athleteID.toString()), {
              ...data,
            });
            setModalUserLoadProgress(100);

            // TODO Add athlete to localforage

            // 3 Get all activities, put in an array
            const pagePercent = runTotal.count / 50;
            const segmentPercentage = Math.floor(90 / pagePercent);

            let activitiesPage = 1;
            let perPage = 50;
            let thisPage = 50;
            let activities: any[] = [];

            // While full page of results, keep iterating page number
            while (perPage === thisPage) {
              let axiosRequestConfig = {
                method: "get",
                url: `https://www.strava.com/api/v3/athlete/activities?page=${activitiesPage}&per_page=${perPage}`,
                headers: {
                  Authorization: `Bearer ${userHook?.userObject?.access_token}`,
                },
              };
              const { data } = await axios(axiosRequestConfig);
              // Spread data into activities array
              activities = [...activities, ...data];
              // Update perPage with length of data
              perPage = data.length;
              // Increment page number
              activitiesPage++;

              // Update activity modal loading
              setModalActivityLoadProgress(activitiesPage * segmentPercentage);
            }

            // Store in db, with associated athlete id
            // Loop over activities
            activities.forEach((activity) => {
              const docRef = db
                .collection("activities")
                .doc(activity.id.toString());
              batch.set(docRef, activity);
            });
            await batch.commit();
            setModalActivityLoadProgress(100);
          } catch (err) {
            console.log(err);
            toast.error(
              "There was a problem loading your data. Refresh the page to try again"
            );
          }
        };

        getUserData();
      } else {
        // 1a If user id exists, and downloadDate is a value, FINISH
        console.log("username exists");


      }
    }
  }, [usernameLoading]);

  return {
    modalUserLoadProgress,
    setModalUserLoadProgress,
    modalActivityLoadProgress,
    setModalActivityLoadProgress,
    modalFinalLoadProgress,
    setModalFinalLoadProgress,
  };
}
