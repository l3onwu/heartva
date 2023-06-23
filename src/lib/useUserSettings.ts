import axios from "axios";
import localforage from "localforage";
import { useState, useEffect } from "react";
import { ActivityShortType, UserType } from "./types";
import { mockActivities } from "../mockData";
import { db } from "./firebase";

export interface UserHookType {
  firstLoad: boolean;
  setFirstLoad: Function;
  userLoading: boolean;
  setUserLoading: Function;
  userObject: UserType;
  setUserObject: Function;
  activities: ActivityShortType[];
  setActivities: Function;
  activitiesLoading: boolean;
  activitiesPage: number;
  setActivitiesPage: Function;
}

export default function useUserSettings() {
  // State
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [userObject, setUserObject] = useState<UserType | null>(null);

  const [activities, setActivities] = useState<ActivityShortType[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesPage, setActivitiesPage] = useState<Number>(1);

  // Refresh token
  useEffect(() => {
    if (userObject) {
      let now = new Date();
      let nowSeconds = now.getTime() / 1000;
      // Check if token is expired, then refresh
      if (userObject?.expires_at < nowSeconds) {
        const refreshToken = async () => {
          let axiosRequestConfig = {
            method: "post",
            url: `https://www.strava.com/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${userObject?.refresh_token}`,
          };
          try {
            const { data: userData } = await axios(axiosRequestConfig);
            setUserObject(userData);
            // Also save to localforage
            localforage.setItem("userObject", userData);
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

  // Get activites (brief) when user is loaded or 'load more' is pressed
  useEffect(() => {
    const getActivities = async () => {
      // If env is dev, use mock data
      if (process.env.REACT_APP_ENV === "DEV") {
        const data = mockActivities;
        // @ts-ignore
        setActivities([...data]);
        setActivitiesLoading(false);
      } else {
        // If env is prod, use real data
        if (!userObject?.athlete) return;
        console.log(userObject);

        db.collection("activities")
          .where("athlete.id", "==", userObject?.athlete?.id)
          // .where('start_date_local', '>=', new firebase.firestore.Timestamp(specifiedYear, 1, 1, 0, 0, 0))
          // .where('start_date_local', '<', new firebase.firestore.Timestamp(specifiedYear + 1, 1, 1, 0, 0, 0));
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

    if (userObject) {
      // @ts-ignore
      getActivities();
    }
  }, [userObject, activitiesPage]);

  // console.log(activities)

  return {
    firstLoad,
    setFirstLoad,
    userLoading,
    setUserLoading,
    userObject,
    setUserObject,
    activities,
    setActivities,
    activitiesLoading,
    activitiesPage,
    setActivitiesPage,
  };
}
