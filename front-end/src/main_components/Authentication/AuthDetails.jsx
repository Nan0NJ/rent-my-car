import React, { useEffect, useState } from "react";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedEmail');
    const storedApprovalStatus = localStorage.getItem('approvalStatus');
    const storedFullname = localStorage.getItem('fullname');

    if (storedEmail) {
      setAuthUser({ email: storedEmail });
      setFullName({ name: storedFullname});
      setApprovalStatus(storedApprovalStatus);
    } else {
      setAuthUser(null);
    }
  }, []);

  return (
    <div className="text-details-auth">
      {authUser ? (
        <>
          <p>{`Signed In as ${fullName.name}`}</p>
          <p>{`User: ${authUser.email}`}</p>
          <p>{`Status: ${approvalStatus && approvalStatus !== '0' ? 'Verified License' : 'Waiting for Verification'}`}</p>
          {/* <button onClick={handleSignOut}>Log Out</button> */}
        </>
      ) : null}
    </div>
  );
};

export default AuthDetails;
