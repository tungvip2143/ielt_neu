import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MPagination from "models/Pagination.model";
import { PAGE_SIZE } from "constants/constants";

interface ICommonDataGrid {
  columns: GridColDef[];
  loading?: boolean;
  pagination?: MPagination;
  rows: Array<any>;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  getRowId?: any;
  checkboxSelection?: boolean;
}

export default function CommonDataGrid({
  columns,
  loading,
  pagination,
  rows,
  getRowId,
  onPageChange = () => null,
  onPageSizeChange = () => null,
  checkboxSelection,
}: ICommonDataGrid) {
  return (
    <DataGrid
      getRowId={getRowId}
      loading={loading}
      rows={rows}
      columns={columns}
      rowCount={pagination?.totalRow || 0}
      pageSize={pagination?.pageSize || 2}
      page={pagination?.page || 0}
      rowsPerPageOptions={PAGE_SIZE}
      checkboxSelection={false}
      disableSelectionOnClick
      keepNonExistentRowsSelected
      onPageChange={(page, detail) => {
        onPageChange(page + 1);
      }}
      onPageSizeChange={(pageSize, detail) => {
        onPageSizeChange(pageSize);
      }}
      pagination
      paginationMode="server"
      autoHeight
    />
  );
}
