import { toast } from "react-toastify";

export function createVoter(userData) {
  // console.log("From API ", userData);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8081/VoterAuth/signup-voter`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success("SignUp successfully");
    } else {
      toast.error("SignUp Failed");
    }
    // TODO: on server it will only return some info of user (not password)
    resolve(data);
  });
}

export function loginVoter({ username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/VoterAuth/login-voter`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log({ data });
        toast.success("Login successful");
        resolve({ data });
      } else {
        const error = await response.text();
        console.log(error);
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
    // TODO: on server it will only return some info of user (not password)
  });
}

export function checkVoter() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/VoterAuth/check-voter`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("Check Auth data : ", data);
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOutVoter() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `http://localhost:8081/VoterAuth/logoutVoter`
        );
        if (response.ok) {
          resolve({ data: "success" });
          toast.success("Sign out Successfully");
        } else {
          const error = await response.text();
          toast.error("Sign out Failed");
          reject(error);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}
