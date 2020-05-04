import http from "../http-common";

const getAll = () => {
  return http.get("/schedules");
};

const find = schedule => {
  return http.post(`/find-schedule`, schedule);
};

const create = schedule => {
  return http.post("/schedule", schedule);
}

export default { getAll, find, create };