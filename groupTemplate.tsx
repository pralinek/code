import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  groupItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  iconButton: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}));


Certainly! Here's the GroupItem component using only Tailwind CSS for styling:

jsx
Copy code
import React from 'react';

const GroupItem = ({ groupName, onRemove }) => {
  return (
    <div className="group-item flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
      <div className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-green-500 flex justify-center items-center text-white mr-2">
          ✓
        </div>
        <div className="text-gray-800">{groupName}</div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        🗑️
      </button>
    </div>
  );
};

export default GroupItem;