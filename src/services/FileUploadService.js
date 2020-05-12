import http from "../http-common";

const uploadFile = file => {
  return http.post("/upload", file);
};

export default { uploadFile };