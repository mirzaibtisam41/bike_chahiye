import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalContext } from "../Context/Context";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const { state, toggleDrawer } = useContext(GlobalContext);
    const [eShop, setEShop] = useState(false);
    const [resource, setResource] = useState(false);

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* <Accordion /> */}
            <List>
                <ListItem button onClick={() => setEShop(!eShop)}>
                    <ListItemText primary="eShop" />
                    <i className="fa fa-caret-down mx-2" aria-hidden="true"></i>
                </ListItem>
                {
                    eShop &&
                    <ul>
                        <li className="mb-2 d-flex justify-content-start ms-3">
                            <span className="li-hover">Network Equipment </span>
                        </li>
                        <li className="mb-2 d-flex justify-content-start ms-3">
                            <span className="li-hover">Server & Storage </span>
                        </li>
                        <li className="mb-2 d-flex justify-content-start ms-3">
                            <span className="li-hover">Unified Communication & Collaboration Equipment</span>
                        </li>
                        <li className="mb-2 d-flex justify-content-start ms-3">
                            <span className="li-hover">Software & Licenses</span>
                        </li>
                    </ul>
                }
                <ListItem button>
                    <ListItemText primary="Losningar" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Tjanster" />
                </ListItem>
                <ListItem button button onClick={() => setResource(!resource)}>
                    <ListItemText primary="Resurser" />
                    <i className="fa fa-caret-down mx-2" aria-hidden="true"></i>
                </ListItem>
                {
                    resource &&
                    <ul className="ms-3">
                        <li>
                            <p className="li-hover">Hur köper man?</p>
                        </li>
                        <li>
                            <p className="li-hover">Frakt och Leverans</p>
                        </li>
                        <li>
                            <p className="li-hover">Retur & Byte</p>
                        </li>
                        <li>
                            <p className="li-hover">Garantier</p>
                        </li>
                        <li>
                            <p className="li-hover">Kredit Villkor</p>
                        </li>
                        <li>
                            <p className="li-hover">Enkel Finansiering</p>
                        </li>
                        <li>
                            <p className="li-hover">Hur köper man?</p>
                        </li>
                        <li>
                            <p className="li-hover">Industri Nyheter</p>
                        </li>
                    </ul>
                }
                <ListItem button>
                    <ListItemText primary="Kundservice" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Om Oss" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Vara Marken" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Tekniskt Bibliotek" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Kontact" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}