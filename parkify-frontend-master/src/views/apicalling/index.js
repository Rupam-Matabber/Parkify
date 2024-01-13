import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
// ------------------ ENCRYPTION ------------------ //

// encrypt data
// encrypt data

const baseUrl = "http://localhost:6969/";

// ------------------ API CALLING ------------------ //
export const onPostData = async (url, data) => {
  // get token from cookie named token and set in header

  if (!cookies.get("data")) {
    console.log("no token");
    return await axios.post(baseUrl + url, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } else {
    const token = cookies.get("data").token;

    // fire post request
    return await axios.post(baseUrl + url, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
        Authorization: "Bearer " + token,
      },
    });
  }
};

export const onDeleteData = async (url) => {
  // get token from cookie named token and set in header

  if (!cookies.get("data")) {
    return await axios.delete(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE",
      },
    });
  } else {
    const token = cookies.get("data").token;
    // fire post request
    return await axios.delete(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE",
        Authorization: "Bearer " + token,
      },
    });
  }
};

export const onPostFormData = async (url, data) => {
  // get token from cookie named data and set in header

  if (!cookies.get("data")) {
    return await axios.post(baseUrl + url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } else {
    const token = cookies.get("data").token;

    // fire post request
    return await axios.post(baseUrl + url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Methods": "POST",
        Authorization: "Bearer " + token,
      },
    });
  }
};

export const onGetData = async (url) => {
  // get token from cookie named token and set in header
  if (!cookies.get("data")) {
    return await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
  } else {
    const token = cookies.get("data").token;

    // fire get request
    return await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: "Bearer " + token,
      },
    });
  }
};
// ------------------ AUTHENTICATION ------------------ //

// set encrypted data in cookie
export const setData = (data) => {
  cookies.set("data", data, { path: "/" });
};

// get cookie data
export const getCookies = () => {
  return cookies.get("data");
};

// remove data from cookie
export const removeData = () => {
  cookies.remove("data", { path: "/" });
  window.location.reload();
};

// check if user is logged in
export const isUser = () => {
  if (cookies.get("data")) {
    const data = cookies.get("data");
    if (data) {
      return data;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
