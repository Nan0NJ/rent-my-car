import React, { useEffect, useState } from "react";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  // Mock BUILD FOR LATER DEVELOPMENT
  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedEmail');
    if (storedEmail) {
      setAuthUser({ email: storedEmail });
    } else {
      setAuthUser(null);
    }

    // const listen = () => { DEVELOP A LISTNER FOR EMAILS LATER FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //   const storedEmail = localStorage.getItem('loggedEmail');
    //   if (storedEmail) {
    //     setAuthUser({ email: storedEmail });
    //   } else {
    //     setAuthUser(null);
    //   }
    // };

    return () => {
      // Clean up listener LATER ON WITH DB CONNECTION
    };
  }, []);

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          {/* <button onClick={handleSignOut}>Log Out</button> */}
        </>
      ) : null /* render nothing */}
    </div>
  );
};

export default AuthDetails;