import { UserInfo } from 'firebase/auth';

type Props = {
  userInfo: UserInfo;
};
export const UserInformation = ({ userInfo }: Props) => {
  const { displayName, email, phoneNumber, photoURL } = userInfo;
  return (
    <div>
      {photoURL && <img className="w-20 h-20 mb-2 rounded-md" src={photoURL} />}
      <p className="mb-1">
        <span className="font-medium">Name:</span> {displayName}
      </p>
      <p className="mb-1">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p>
        <span className="font-medium">PhoneNumber:</span> {phoneNumber ?? '-'}
      </p>
    </div>
  );
};
