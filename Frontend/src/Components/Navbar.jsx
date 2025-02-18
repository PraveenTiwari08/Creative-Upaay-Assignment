import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowDropDown } from "@mui/icons-material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem, Box, Typography, Button, Divider } from "@mui/material";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Open Menu
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // ✅ Clear Redux state
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 border-b border-gray-300 w-full bg-white z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo & Website Name */}
        <img src="/Group 7.png" alt="Logo" className="h-6 relative" />
        <h1 className="text-xl font-semibold relative">Project M.</h1>

        {/* Double Arrow */}
        <KeyboardDoubleArrowLeftIcon className="ml-4 relative z-10" />

        {/* Search Bar */}
        <div className="relative ml-24">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-[417px] h-[44px] pl-10 pr-4 rounded-md focus:outline-none bg-[rgb(245,245,245)]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <DateRangeIcon className="relative z-10" />
        <FeedbackIcon className="relative z-10" />
        <NotificationsNoneIcon className="relative z-10" />

        {/* User Info */}
        <div className="text-right">
          <p className="font-semibold relative z-10">Praveen Tiwari</p>
          <p className="text-sm text-gray-500 relative z-10">Indore, Madhya Pradesh</p>
        </div>

        {/* Profile Picture */}
        <img src="/Praveen.png" alt="User" className="h-10 w-10 rounded-full border relative z-10" />

        {/* Dropdown Icon */}
        <ArrowDropDown className="text-gray-600 cursor-pointer relative z-10" onClick={handleOpen} />

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: 6, minWidth: 220 },
          }}
        >
          {/* User Info */}
          <MenuItem onClick={handleClose} sx={{ padding: 2 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src="/Praveen.png" alt="User" className="h-10 w-10 rounded-full border" />
              <Box>
                <Typography fontWeight="bold">Praveen Tiwari</Typography>
                <Typography fontSize="small" color="gray">Indore, Madhya Pradesh</Typography>
              </Box>
            </Box>
          </MenuItem>

          <Divider />

          {/* Logout Button */}
          <MenuItem onClick={handleLogout} sx={{ justifyContent: "center", padding: 2 }}>
            <Button variant="contained" color="error" fullWidth>
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
