function Tables({
  Heading,
  Body,
}: {
  Heading: {
    title: string;
    index: string;
    render: (a: any) => JSX.Element;
  }[];
  Body: any;
}) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {Heading.map((head) => (
            <th scope="col" className="px-6 py-3">
              {head.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Body.map((bdy: any) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {Object.entries(bdy).map((cnt, idx) => (
              <td className="px-6 py-4">
                {Heading.find((a) => a.index === cnt[0])?.render(cnt[1])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tables;
