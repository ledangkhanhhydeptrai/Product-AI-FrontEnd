import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Skeleton
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
  loading?: boolean;
  loadingRows?: number;
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyText = "No data yet",
  emptyHint = "Items will show up here once available.",
  loading = false,
  loadingRows = 5
}: DataTableProps<T>) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #eef0f3",
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 1px 3px rgba(15,23,42,0.05)"
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(180deg, #f6f7fc 0%, #eef0f7 100%)"
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align ?? "left"}
                width={column.width}
                sx={{
                  fontWeight: 700,
                  fontSize: 12.5,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  color: "#5b5f76",
                  borderBottom: "1px solid #e3e5ef",
                  py: 1.7,
                  whiteSpace: "nowrap"
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: loadingRows }).map((_, idx) => (
              <TableRow key={`skeleton-${idx}`}>
                {columns.map((column) => (
                  <TableCell key={String(column.id)} sx={{ py: 1.8 }}>
                    <Skeleton variant="text" sx={{ fontSize: 14 }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length ? (
            rows.map((row, idx) => (
              <TableRow
                key={rowKey(row)}
                hover
                sx={{
                  bgcolor: idx % 2 === 1 ? "#fafbfd" : "#fff",
                  "&:last-child td": { borderBottom: 0 },
                  "& td": { borderColor: "#f1f2f5", py: 1.6 },
                  transition: "background-color 0.15s ease",
                  "&:hover": { bgcolor: "#f3f4ff" }
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
              <TableCell
                colSpan={columns.length}
                sx={{ border: 0, py: 8, bgcolor: "#fafbfd" }}
              >
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
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #eef0ff, #f5f3ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 0.5,
                      border: "1px solid #e6e8fb"
                    }}
                  >
                    <InboxRoundedIcon sx={{ fontSize: 26, color: "#818CF8" }} />
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
