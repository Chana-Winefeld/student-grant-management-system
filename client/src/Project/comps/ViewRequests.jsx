import {
  Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  Paper, TableContainer, Chip, Stack, Button, TextField, MenuItem,
  Select, FormControl, InputLabel, Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const STATUS_LABELS = {
  draft: "טיוטה",
  submitted: "בהמתנה",
  approved: "מאושרת",
  rejected: "נדחתה",
};
const STATUS_COLORS = {
  draft: "default",
  submitted: "primary",
  approved: "success",
  rejected: "error",
};

const initialFilters = {
  id: "",
  fromDate: "",
  toDate: "",
  city: "",
  minSiblings: "",
  maxSiblings: "",
  minTuition: "",
  maxTuition: "",
  sortBy: "date",
  sortOrder: "desc",
};

export const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const fetchRequests = async (activeFilters = filters) => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(activeFilters).filter(([_, v]) => v !== "")
      );

      const response = await axios.get("http://localhost:5000/api/requests/all", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setRequests(response.data.data);
    } catch (error) {
      Swal.fire({ title: "שגיאה בטעינת הבקשות", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => fetchRequests(filters);

  const handleReset = () => {
    setFilters(initialFilters);
    fetchRequests(initialFilters);
  };

  const updateStatus = async (requestId, newStatus) => {
    const confirmText = newStatus === "approved" ? "לאשר" : "לדחות";
    const result = await Swal.fire({
      title: `האם אתה בטוח שברצונך ${confirmText} את הבקשה?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "כן",
      cancelButtonText: "ביטול",
      confirmButtonColor: newStatus === "approved" ? "#2e7d32" : "#d32f2f",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${requestId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: newStatus === "approved" ? "הבקשה אושרה!" : "הבקשה נדחתה",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      // מסיר את הבקשה מיידית מהרשימה ללא fetch נוסף
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch {
      Swal.fire({ title: "שגיאה בעדכון הסטטוס", icon: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6, p: 2 }}>
      <Typography variant="h4" fontWeight={600} mb={3} textAlign="center">
        ניהול בקשות מלגה
      </Typography>

      {/* אזור סינונים */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #e0e0e0", boxShadow: "none" }}>
        <Typography fontWeight={600} mb={2}>סינון וחיפוש</Typography>

        <Grid container spacing={2}>

          {/* מ.ז */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="חיפוש לפי מ.ז"
              value={filters.id}
              onChange={(e) => handleFilterChange("id", e.target.value)}
            />
          </Grid>

          {/* עיר */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="עיר מגורים"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </Grid>

          {/* מתאריך */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="מתאריך" type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
            />
          </Grid>

          {/* עד תאריך */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="עד תאריך" type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
            />
          </Grid>

          {/* אחים מינימום */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="אחים מתחת לגיל 18 — מינימום"
              type="number" inputProps={{ min: 0 }}
              value={filters.minSiblings}
              onChange={(e) => handleFilterChange("minSiblings", e.target.value)}
            />
          </Grid>

          {/* אחים מקסימום */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="אחים מתחת לגיל 18 — מקסימום"
              type="number" inputProps={{ min: 0 }}
              value={filters.maxSiblings}
              onChange={(e) => handleFilterChange("maxSiblings", e.target.value)}
            />
          </Grid>

          {/* שכר לימוד מינימום */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="שכר לימוד מינימום (₪)"
              type="number" inputProps={{ min: 0 }}
              value={filters.minTuition}
              onChange={(e) => handleFilterChange("minTuition", e.target.value)}
            />
          </Grid>

          {/* שכר לימוד מקסימום */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth size="small" label="שכר לימוד מקסימום (₪)"
              type="number" inputProps={{ min: 0 }}
              value={filters.maxTuition}
              onChange={(e) => handleFilterChange("maxTuition", e.target.value)}
            />
          </Grid>

          {/* מיון לפי */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>מיון לפי</InputLabel>
              <Select
                value={filters.sortBy}
                label="מיון לפי"
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <MenuItem value="date">תאריך הגשה</MenuItem>
                <MenuItem value="siblings">כמות אחים</MenuItem>
                <MenuItem value="tuition">שכר לימוד</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* סדר מיון */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>סדר מיון</InputLabel>
              <Select
                value={filters.sortOrder}
                label="סדר מיון"
                onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              >
                <MenuItem value="desc">מהגבוה לנמוך</MenuItem>
                <MenuItem value="asc">מהנמוך לגבוה</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* כפתורים */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ background: "#1f2d5c", borderRadius: 2, fontWeight: 600,
                  "&:hover": { background: "#162349" } }}
              >
                חפש
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ borderRadius: 2, fontWeight: 600 }}
              >
                איפוס סינונים
              </Button>
            </Stack>
          </Grid>

        </Grid>
      </Paper>

      {/* טבלה */}
      <Paper sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e0e0e0" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f7f8ff" }}>
                <TableCell sx={{ fontWeight: 700 }}>מ.ז</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>שם משפחה</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>שם פרטי</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>מגמה</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>סטטוס</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">טוען...</TableCell>
                </TableRow>
              ) : requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">אין בקשות בהמתנה</TableCell>
                </TableRow>
              ) : (
                requests.map((req) => (
                  <TableRow key={req._id} hover>
                    <TableCell>{req.personalDetails?.id}</TableCell>
                    <TableCell>{req.personalDetails?.lastName}</TableCell>
                    <TableCell>{req.personalDetails?.firstName}</TableCell>
                    <TableCell>{req.courseDetails?.major}</TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_LABELS[req.status] || req.status}
                        color={STATUS_COLORS[req.status] || "default"}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained" size="small" color="success"
                          sx={{ borderRadius: "10px", minWidth: 70 }}
                          onClick={() => updateStatus(req._id, "approved")}
                        >
                          אישור
                        </Button>
                        <Button
                          variant="contained" size="small" color="error"
                          sx={{ borderRadius: "10px", minWidth: 70 }}
                          onClick={() => updateStatus(req._id, "rejected")}
                        >
                          דחייה
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};