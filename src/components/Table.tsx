import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography
} from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

export interface Column<T> {
  id: keyof T | string;
  label: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  emptyText?: string;
  emptyHint?: string;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyText = "No data yet",
  emptyHint = "Items will show up here once available."
}: DataTableProps<T>) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "1px solid #eef0f3",
        overflow: "hidden"
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8f9fb" }}>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align ?? "left"}
                width={column.width}
                sx={{
                  fontWeight: 700,
                  fontSize: 12.5,
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                  color: "#64748b",
                  borderBottom: "1px solid #eef0f3",
                  py: 1.6
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={rowKey(row)}
                hover
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                  "& td": { borderColor: "#f1f2f5", py: 1.6 },
                  transition: "background-color 0.12s ease",
                  "&:hover": { bgcolor: "#f8f9fb" }
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.align ?? "left"}
                    sx={{ fontSize: 14, color: "#1e293b" }}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.id as keyof T] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ border: 0, py: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      bgcolor: "#f4f5f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 0.5
                    }}
                  >
                    <InboxRoundedIcon sx={{ fontSize: 24, color: "#94a3b8" }} />
                  </Box>
                  <Typography
                    sx={{ fontSize: 14.5, fontWeight: 600, color: "#334155" }}
                  >
                    {emptyText}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
                    {emptyHint}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
