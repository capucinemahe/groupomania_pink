export default function apiHeaders(isMultipartData = false) {
    //par défaut il n'y a pas de content type

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    //si j'ai le paramètre à true, ca rajoute le content type mutlipart data
    if (isMultipartData) {
        headers.headers["Content-Type"] = "multipart/form-data"
    }
    return headers;
  }
};
