import axios from "axios";
import localforage from "localforage";
import { useState, useEffect } from "react";
import { ActivityShortType, UserType } from "./types";
import { mockActivities } from "../mockData2";
import { db } from "./firebase";

export interface UserHookType {
  firstLoad: boolean;
  setFirstLoad: Function;
  userLoading: boolean;
  setUserLoading: Function;
  userObject: UserType;
  setUserObject: Function;
  demoMode: boolean;
  setDemoMode: Function;
  activities: ActivityShortType[];
  setActivities: Function;
  activitiesLoading: boolean;
  statsYear: number;
  setStatsYear: Function;
}

export default function useUserSettings() {
  // State
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userObject, setUserObject] = useState<UserType | null>(null);
  const [demoMode, setDemoMode] = useState<boolean>(false);

  const [activities, setActivities] = useState<ActivityShortType[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [statsYear, setStatsYear] = useState<number>(new Date().getFullYear());

  // Refresh token
  useEffect(() => {
    if (userObject) {
      let now = new Date();
      let nowSeconds = now.getTime() / 1000;
      // Check if token is expired. If so, copy the athlete data, and refresh
      if (userObject?.expires_at < nowSeconds) {
        const refreshToken = async () => {
          let axiosRequestConfig = {
            method: "post",
            url: `https://www.strava.com/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${userObject?.refresh_token}`,
          };

          // Save athlete data
          const athleteData = userObject?.athlete;

          // Refresh token
          try {
            const { data: userData } = await axios(axiosRequestConfig);
            const updatedUserObject = { ...userData, athlete: athleteData };
            setUserObject(updatedUserObject);
            // Also save to localforage
            localforage.setItem("userObject", updatedUserObject);
          } catch (err) {
            console.log(err);
          }
        };
        refreshToken();
      }
    }
  }, [userObject]);

  // Get user from localforage on load
  useEffect(() => {
    let getUser = async () => {
      let savedUser = await localforage.getItem("userObject");
      if (savedUser) {
        // @ts-ignore
        setUserObject(savedUser);
      }
      setFirstLoad(false);
    };
    getUser();
  }, []);

  // Update activities, then get on load
  useEffect(() => {
    // TODO consider making this a manual button, or only gets done once per day
    const updateActivities = async () => {
      // Skip if not first update
      if (!firstUpdate) {
        return;
      }
      // Skip if year is not current year
      if (statsYear !== new Date().getFullYear()) {
        return;
      }

      // Get date of latest activity from firebase
      // TODO it may be more efficient to store the latest activity date with user object, save a query
      const latestQuery = db
        .collection("activities")
        .where("athlete.id", "==", userObject?.athlete?.id)
        .orderBy("start_date", "desc")
        .limit(1);
      const latestActivity = await latestQuery.get();
      const latestActivityDate = latestActivity.docs[0].data().start_date;
      // console.log(latestActivityDate)

      // Then retrieve latest activities from Strava
      const newActivities = [];
      let activitiesPage = 1;
      let notDone = true;
      while (notDone) {
        // Keep making requests until we find activity with earlier date
        let axiosRequestConfig = {
          method: "get",
          url: `https://www.strava.com/api/v3/athlete/activities?page=${activitiesPage}&per_page=${10}`,
          headers: {
            Authorization: `Bearer ${userObject?.access_token}`,
          },
        };
        const { data } = await axios(axiosRequestConfig);

        // Loop over retrieved activities. If the activity is after the latest activity, add it to the list. If not, break the loop.
        for (let activity of data) {
          const activityDate = new Date(activity.start_date);
          const compareDate = new Date(latestActivityDate);
          if (activityDate > compareDate) {
            newActivities.push(activity);
          } else {
            notDone = false;
            break;
          }
        }
        activitiesPage++;
      }

      // Then add new activities to firestore
      const batch = db.batch();
      for (let activity of newActivities) {
        const docRef = db.collection("activities").doc(activity.id.toString());
        batch.set(docRef, activity);
      }
      await batch.commit();
      setFirstUpdate(false);
    };

    const getActivities = async () => {
      setActivitiesLoading(true);
      // If env is dev, use mock data
      if (process.env.REACT_APP_ENV === "DEV") {
        const data = mockActivities;
        // @ts-ignore
        setActivities([...data]);
        setActivitiesLoading(false);
      } else {
        // If env is prod, use real data
        // Ensure user object or in demo mode
        if (!userObject?.athlete && !demoMode) return;
        const athleteDemoReal = demoMode
          ? // @ts-ignore
            parseInt(process.env.REACT_APP_IDOL_ID)
          : userObject?.athlete?.id;

        // Now RETRIEVE activities by set year
        db.collection("activities")
          .where("athlete.id", "==", athleteDemoReal)
          .where("start_date", ">=", statsYear.toString())
          .where("start_date", "<", (statsYear + 1).toString())
          .orderBy("start_date", "desc")
          .get()
          .then((querySnapshot) => {
            // @ts-ignore
            setActivities(querySnapshot.docs.map((doc) => doc.data()));
            setActivitiesLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setActivitiesLoading(false);
          });
      }
    };

    const combineActivities = async () => {
      // TODO consider making this a manual button, or only gets done once per day
      setActivitiesLoading(true);
      await updateActivities();
      await getActivities();
    };

    if (userObject) {
      combineActivities();
    } else if (demoMode) {
      setActivitiesLoading(true);
      getActivities();
    }
  }, [userObject, statsYear, demoMode]);

  // console.log(activities)

  return {
    firstLoad,
    setFirstLoad,
    userLoading,
    setUserLoading,
    userObject,
    setUserObject,
    demoMode,
    setDemoMode,
    activities,
    setActivities,
    activitiesLoading,
    statsYear,
    setStatsYear,
  };
}
