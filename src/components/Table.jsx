import { useTable, useFilters, useSortBy, useGlobalFilter } from "react-table";

const Table = ({ columns, data, headerColor = "bg-gray-600" }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-end">
        <input
          value={state.globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Items..."
          className="mb-4 p-2 border border-black rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto relative">
        <table
          className={`min-w-full border border-black border-collapse`}
          {...getTableProps()}
        >
          <thead className="sticky top-0 table-header-group">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="border border-black md:border-none table-row"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`${headerColor} p-2 text-white font-bold md:border md:border-black text-left table-cell`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">{column.render("Header")}</div>
                      <div className="text-xs">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span>⬇️</span>
                          ) : (
                            <span>⬆️</span>
                          )
                        ) : (
                          <span>↕️</span>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-row-group">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-gray-100 border border-black md:border-none table-row"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-2 border border-black md:border md:border-black text-left table-cell"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
