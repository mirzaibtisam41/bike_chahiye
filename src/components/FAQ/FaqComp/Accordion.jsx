import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MainDataObject } from "./DetailObject";
import { GlobalContext } from "../../Context/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: "#d32229",
        fontWeight: "bold"
    },
}));

export default function SimpleAccordion() {
    const classes = useStyles();
    const { faqDisplay } = useContext(GlobalContext);
    return (
        <section className="pt-5">
            <div className="faq-grid" >
                {
                    MainDataObject[faqDisplay].faqArray?.map((item, index) => {
                        return <div className="mb-3" key={index}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{item.ques}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="text-muted" style={{ textAlign: "justify", fontSize: "smaller" }}>
                                        {
                                            item.ans.map((item, index) => {
                                                return <p key={index}>{item.a}</p>
                                            })
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    })
                }
            </div>
        </section>
    );
}