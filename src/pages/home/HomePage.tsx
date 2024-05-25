import { Button } from '../../components/ui';

export const HomePage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-2xl font-bold mb-4">IP Calculator / IP Subnetting</h1>

      <h2 className="mb-2 font-semibold text-lg">
        Welcome to Subnet Calculator!
      </h2>

      <p className="mb-4">
        Welcome to Subnet Calculator, your go-to tool for all your subnetting
        needs! This website is designed to simplify the process of subnetting,
        whether you are a networking student, IT professional, or enthusiast.
        Understanding and calculating subnets can be complex and time-consuming,
        but our tool streamlines the entire process, saving you valuable time
        and effort.
      </p>

      <h2 className="mb-2 font-semibold text-lg">Why Use Subnet Calculator?</h2>

      <ul className="mb-2 list-disc list-inside">
        <li className="mb-1">
          <span className="font-medium">Efficiency</span>: Quickly calculate
          subnet masks, network addresses, and host ranges with ease.
        </li>
        <li className="mb-1">
          <span className="font-medium">Accuracy</span>: Ensure precise
          subnetting calculations to avoid errors in your network setup.
        </li>
        <li className="mb-1">
          <span className="font-medium">User-Friendly</span>: Our intuitive
          interface makes it simple for anyone to use, regardless of technical
          expertise.
        </li>
        <li>
          <span className="font-medium">Educational</span>: Learn about
          subnetting concepts and see how different inputs affect your network
          configuration.
        </li>
      </ul>

      <p className="mb-2">
        Whether you are designing a new network, troubleshooting an existing
        one, or studying for an exam, Subnet Calculator is here to help.
      </p>

      <p className="mb-2">
        Start using Subnet Calculator today and take the complexity out of
        subnetting. Click the button below to begin your calculations and see
        how easy networking can be!
      </p>

      <p className="mb-5">Happy subnetting!</p>

      <Button text="Go to IP Calculator" isAppLink to="/calculator" />
    </div>
  );
};
