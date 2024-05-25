import { IPInfo } from '../../../utils/ipCalculator';

type Props = {
  ipInfo: IPInfo;
};
export const IPInfoTable = ({ ipInfo }: Props) => {
  return (
    <div className="border py-2 px-4 inline-block rounded-md">
      <table className="table-fixed font-monospace">
        <tbody>
          <tr>
            <td className="pr-4">Address:</td>
            <td className="pr-4 text-blue-600">{ipInfo.address.decimal}</td>
            <td className="text-gray-500">{ipInfo.address.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">Netmask:</td>
            <td className="pr-4 text-blue-600">
              {ipInfo.netmask.decimal} = {ipInfo.inputMask}
            </td>
            <td className="text-gray-500">{ipInfo.netmask.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">Wildcard:</td>
            <td className="pr-4 text-blue-600">{ipInfo.wildcard.decimal}</td>
            <td className="text-gray-500">{ipInfo.wildcard.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">Network:</td>
            <td className="pr-4 text-blue-600">
              {ipInfo.network.decimal}/{ipInfo.inputMask}
            </td>
            <td className="text-gray-500">{ipInfo.network.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">Broadcast:</td>
            <td className="pr-4 text-blue-600">{ipInfo.broadcast.decimal}</td>
            <td className="text-gray-500">{ipInfo.broadcast.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">HostMin:</td>
            <td className="pr-4 text-blue-600">{ipInfo.hostMin.decimal}</td>
            <td className="text-gray-500">{ipInfo.hostMin.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">HostMax:</td>
            <td className="pr-4 text-blue-600">{ipInfo.hostMax.decimal}</td>
            <td className="text-gray-500">{ipInfo.hostMax.binaryWithMask}</td>
          </tr>
          <tr>
            <td className="pr-4">Hosts:</td>
            <td className="pr-4 text-blue-600">{ipInfo.hostsCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
