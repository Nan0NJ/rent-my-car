import React, { useEffect, useState } from "react";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedEmail');
    const storedApprovalStatus = localStorage.getItem('approvalStatus');

    if (storedEmail) {
      setAuthUser({ email: storedEmail });
      setApprovalStatus(storedApprovalStatus);
    } else {
      setAuthUser(null);
    }
  }, []);

  return (
    <div className="text-details-auth">
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <p>{`Status: ${approvalStatus !== null ? approvalStatus : 'Loading...'}`}</p>
          {/* <button onClick={handleSignOut}>Log Out</button> */}
        </>
      ) : null}
    </div>
  );
};

export default AuthDetails;
