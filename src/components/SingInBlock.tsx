import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../config';

export const SingInBlock = () => {
  const handleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      console.log(data.user);
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
