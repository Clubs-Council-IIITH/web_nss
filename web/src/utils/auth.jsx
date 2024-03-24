"use client";

import { setCookie } from "cookies-next";

export function login(pathname) {
  // save path to continue from
  setCookie("continue", pathname);

  // redirect to CAS login
  window.location.replace(
    "https://clubs.iiit.ac.in/login/https://clubs.iiit.ac.in/manage/events/",
  );
}

export async function logout(pathname) {
  // save path to continue from
  setCookie("continue", pathname);

  // set flag to expire token the next time someone visits the site, because CAS doesn't follow ?service for some reason
  // setCookie("logout", true);

  // console.log("Logging out...");

  // fetch logout page to expire token
  await fetch("https://clubs.iiit.ac.in/logoutCallback");

  // redirect to CAS logout
  window.location.replace("https://clubs.iiit.ac.in/logout");
}
