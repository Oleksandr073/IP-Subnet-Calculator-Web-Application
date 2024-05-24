import { signOut } from 'firebase/auth';

import { auth } from '../../../config';

export const SignOutBlock = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // nothing to do
    }
  };

  const handleClick = () => {
    void handleSignOut();
  };

  return (
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};
