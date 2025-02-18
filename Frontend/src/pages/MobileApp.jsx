import React, { useState } from "react";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WindowIcon from "@mui/icons-material/Window";
import PauseIcon from "@mui/icons-material/Pause";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Todo from "./todo";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setDate } from "../redux/filterSlice";

function MobileApp() {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.status);
  const selectedDate = useSelector((state) => state.filter.date);

  // Dropdown state
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElDate, setAnchorElDate] = useState(null);

  // Open & Close functions
  const handleOpenFilter = (event) => setAnchorElFilter(event.currentTarget);
  const handleCloseFilter = () => setAnchorElFilter(null);
  const handleOpenDate = (event) => setAnchorElDate(event.currentTarget);
  const handleCloseDate = () => setAnchorElDate(null);

  // Handle selection
  const handleFilterChange = (status) => {
    dispatch(setStatus(status));
    handleCloseFilter();
  };

  const handleDateChange = (date) => {
    dispatch(setDate(date));
    handleCloseDate();
  };

  return (
    <>
      {/* Top Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width={1190}
        ml={-50}
        overflowX="hidden"
      >
        {/* Left Side: Heading + Icon Buttons */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h3" fontWeight="bold">
            Mobile App
          </Typography>
          <IconButton
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "blue",
              color: "white",
              "&:hover": { bgcolor: "darkblue" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              bgcolor: "blue",
              color: "white",
              "&:hover": { bgcolor: "darkblue" },
            }}
          >
            <LinkIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Right Side: Image */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            sx={{
              width: 22,
              height: 22,
              borderRadius: 2,
              bgcolor: "blue",
              color: "white",
              "&:hover": { bgcolor: "darkblue" },
            }}
          >
            <AddBoxIcon fontSize="small" />
          </IconButton>
          <Typography
            sx={{ color: "blue", cursor: "pointer", fontSize: "1.1rem" }}
          >
            Invite
          </Typography>
          <img
            src="/Group 642.png"
            alt="Project"
            style={{
              width: 200,
              height: 47,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      </Box>

      {/* Filters & Date Dropdown */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width={1190}
        ml={-50}
        mt={4}
        overflow="hidden"
      >
        {/* Left Side: Filter & Date Dropdowns */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Filter Dropdown */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 1,
              cursor: "pointer",
            }}
            onClick={handleOpenFilter}
          >
            <FilterAltIcon fontSize="small" />
            <Typography fontSize="0.9rem">{selectedFilter}</Typography>
            <ArrowDropDownIcon />
          </Box>
          <Menu
            anchorEl={anchorElFilter}
            open={Boolean(anchorElFilter)}
            onClose={handleCloseFilter}
          >
            <MenuItem onClick={() => handleFilterChange("All")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterChange("To Do")}>
              To Do
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("In Progress")}>
              In Progress
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("Done")}>Done</MenuItem>
          </Menu>

          {/* Date Dropdown */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 1,
              cursor: "pointer",
            }}
            onClick={handleOpenDate}
          >
            <CalendarMonthIcon fontSize="small" />
            <Typography fontSize="0.9rem">{selectedDate}</Typography>
            <ArrowDropDownIcon />
          </Box>
          <Menu
            anchorEl={anchorElDate}
            open={Boolean(anchorElDate)}
            onClose={handleCloseDate}
          >
            <MenuItem onClick={() => handleDateChange("Today")}>Today</MenuItem>
            <MenuItem onClick={() => handleDateChange("This Week")}>
              This Week
            </MenuItem>
            <MenuItem onClick={() => handleDateChange("This Month")}>
              This Month
            </MenuItem>
          </Menu>
        </Box>

        {/* Right Side: Share Button & Icons */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "1.1rem",
              border: "1px solid #ccc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "4px 8px",
            }}
          >
            <PeopleAltIcon fontSize="small" /> Share
          </Typography>
          <Typography>|</Typography>
          <IconButton
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: "blue",
              color: "white",
              transform: "rotate(90deg)",
              "&:hover": { bgcolor: "darkblue" },
            }}
          >
            <PauseIcon fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              width: 32,
              height: 32,
              borderRadius: 4,
              bgcolor: "transparent",
              color: "black",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            <WindowIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Todo />
    </>
  );
}

export default MobileApp;
