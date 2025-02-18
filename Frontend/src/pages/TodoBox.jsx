import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Draggable } from "@hello-pangea/dnd";
import SmsIcon from '@mui/icons-material/Sms';
import TopicIcon from '@mui/icons-material/Topic';

function TodoBox({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
  {(provided) => (
    <Box
      width={350}
      height={177}
      bgcolor="white"
      p={2}
      borderRadius={2}
      boxShadow={1}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      mb={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="caption" bgcolor="red" color="white" p={0.2} width={45} borderRadius={1}>
          Low
        </Typography>
        <IconButton>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography fontWeight="bold" align="left" mb={1}>{task.title}</Typography>
      <Typography variant="body2" align="left" color="gray" mb={2}>{task.description}</Typography>

      {/* Image and Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left Side: Image */}
        <img src="/Group 633.png" alt="User" width={70} height={70} style={{ borderRadius: "50%" }} />

        {/* Right Side: Buttons */}
        <Box display="flex" >
          <IconButton>
            <SmsIcon fontSize="small" />
            <Typography variant="body2" fontSize="small" sx={{ ml: 0.2 }}>3 Comments</Typography>
          </IconButton>
          <IconButton>
            <TopicIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.2 }}>2 files</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  )}
</Draggable>

  );
}

export default TodoBox;
