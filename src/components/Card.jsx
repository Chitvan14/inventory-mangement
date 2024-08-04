
const Card = ({ data, columns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="bg-white shadow-md rounded-lg p-4">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="mb-2 text-sm font-medium text-gray-900"
            >
              {" "}
              {colIndex === 0 ? (
                <div className="font-oswald text-2xl font-bold uppercase truncate">  {column.Cell
                    ? column.Cell({ row: { original: row } })
                    : row[column.accessor]}</div>
              ) : (
                <>
                  {" "}
                 
                  <div className="truncate"> <strong>{column.Header} : </strong>  {column.Cell
                    ? column.Cell({ row: { original: row } })
                    : row[column.accessor]}</div>
                
                </>
              )}{" "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
