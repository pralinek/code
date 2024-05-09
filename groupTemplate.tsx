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

const GroupItem = ({ groupName, onRemove }) => {
  const classes = useStyles();

  return (
    <div className={classes.groupItem}>
      <div className={classes.flex}>
        <CheckIcon color="primary" />
        <Typography variant="body1" color="textPrimary">
          {groupName}
        </Typography>
      </div>
      <IconButton className={classes.iconButton} onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default GroupItem;