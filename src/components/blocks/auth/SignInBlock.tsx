import { signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../../config';
import { Button } from '../../ui';

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
      <Button onClick={handleClick} text="Sing In with Google" />
    </div>
  );
};
