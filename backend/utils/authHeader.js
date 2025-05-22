// client/src/utils/authHeader.js
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage in authHeader:", user); // Add this!

  if (user && user.token) {
    console.log("Sending Authorization header with token."); // Add this!
    return { Authorization: "Bearer " + user.token };
  } else {
    console.log("No token found in localStorage for authHeader."); // Add this!
    return {};
  }
}
