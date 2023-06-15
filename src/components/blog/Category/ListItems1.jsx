import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { GlobalContext } from "../../Context/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        '&:hover': {
            color: "black",
         },
      
    },
   
}));

export default function AlignItemsList({ blogData, array }) {
    const classes = useStyles();
    const { blogsToShow, setBlogsToShow, setBlogDetail} = useContext(GlobalContext);

    const sendData = (index, item) => {
        setBlogsToShow(index);
        setBlogDetail(item);
    }

    return (
        <List className={classes.root}>
            {
                blogData?.map((item, index) => {
                    return <ListItem onClick={() => sendData(index, item)} key={index} alignItems="flex-start" className="p-0 px-3">
                        {/* <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={blogsToShow === index ? true : false}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon> */}
                        <ListItemText
                            primary={item.title}
                            className={classes.inline}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                       
                                        color="textPrimary"
                                    >
                                    </Typography>
                                    {/* {Parser(item.sections[0].Content)} */}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                })
            }
        </List>
    );
}