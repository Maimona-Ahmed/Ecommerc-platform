
function AdditionalInfo({ data = [] }) {

  if (data.length === 0) {
    return (
      <p className="text-gray-500">
        No additional information available.
      </p>
    );
  }

  return (
    <table className="w-full max-w-xl">

      <tbody>

        {data.map((item) => (

          <tr
            key={item.id}
            className="border-b"
          >

            <td
              className="
                py-3
                font-semibold
              "
            >
              {item.name}
            </td>


            <td
              className="
                py-3
                text-gray-600
              "
            >
              {item.value}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default AdditionalInfo
