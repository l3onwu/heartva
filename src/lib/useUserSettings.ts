import axios from "axios";
import localforage from "localforage";
import { useState, useEffect } from "react";
import { ActivityShortType, UserType } from "./types";

export interface UserHookType {
  userObject: UserType;
  setUserObject: Function;
  activities: ActivityShortType[];
  setActivities: Function;
  activitiesPage: number;
  setActivitiesPage: Function;
}

export default function useUserSettings() {
  // State
  const [userObject, setUserObject] = useState<UserType | null>(null);
  const [activities, setActivities] = useState<ActivityShortType[]>([]);
  const [activitiesPage, setActivitiesPage] = useState<Number>(1);

  // Refresh token
  useEffect(() => {
    if (userObject) {
      let now = new Date();
      // Check if token is expired, then refresh
      if (userObject?.expires_at < now.getTime() / 1000) {
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
  }, []);

  // Get user from localforage on load
  useEffect(() => {
    let getUser = async () => {
      let savedUser = await localforage.getItem("userObject");
      if (savedUser) {
        // @ts-ignore
        setUserObject(savedUser);
      }
    };
    getUser();
  }, []);

  // Get activites (brief) when user is loaded or 'load more' is pressed
  useEffect(() => {
    const getActivities = async () => {
      let axiosRequestConfig = {
        method: "get",
        url: `https://www.strava.com/api/v3/athlete/activities?page=${activitiesPage}&per_page=5`,
        headers: { Authorization: `Bearer ${userObject?.access_token}` },
      };
      try {
        const { data } = await axios(axiosRequestConfig);
        setActivities([...activities, ...data]);
      } catch (err) {
        console.log(err);
      }
    };
    if (userObject) {
      getActivities();
    }
  }, [userObject, activitiesPage]);

  return {
    userObject,
    setUserObject,
    activities,
    setActivities,
    activitiesPage,
    setActivitiesPage,
  };
}
