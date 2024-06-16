import {getJson, post} from "./BaseRestClient";
import dummyGetActivityDetailsByGroupId from "./activityDetailsByGroupId.json";
import dummyGetActivitiesByGroupId from "./activitiesByGroupId.json"


export const getActivitiesByGroupId = (groupId, callback, errorHandler) => {
  // getJson(`/activities?groupId=${groupId}`, callback, errorHandler);
  callback(dummyGetActivitiesByGroupId);
}

export const getActivityDetailsByGroupId = (groupId, callback, errorHandler) => {
  // getJson(`/activity-details-by-group?groupId=${groupId}`, callback, errorHandler);
  callback(dummyGetActivityDetailsByGroupId);
}

export const postActivity = (data, callback, errorHandler) => {
  post(`/activity`, data, callback, errorHandler);
}

export const postActivityDetails = (data, callback, errorHandler) => {
  post(`/activity-details`, data, callback, errorHandler);
}


export const postGroup = (data, callback, errorHandler) => {
  post(`/group`, data, callback, errorHandler);
}
