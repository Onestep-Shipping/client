import http from "../http-common";

const uploadFile = file => {
  return http.post("/upload", file);
};

const downloadFile = url => {
  return http.get("/download", {
    params: { url },
    responseType: 'arraybuffer',
  });
}

export default { uploadFile, downloadFile };