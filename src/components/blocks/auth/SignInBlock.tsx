import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../../config';

export const SignInBlock = () => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch {
      // nothing to do
    }
  };

  const handleClick = () => {
    void handleSignIn();
  };

  return (
    <div>
      <button onClick={handleClick}>Sing In with Google</button>
    </div>
  );
};
