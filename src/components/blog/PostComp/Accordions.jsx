import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '20px'

  },
  heading: {
    fontSize: theme.typography.pxToRem(26),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion({ productBlog }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ border: '1px solid white', padding: '5px', boxShadow: '5px 10px #FA7C26', backgroundColor: 'white' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: '#FFF4EC' }}
        >
          <Typography className={classes.heading} style={{ fontWeight: '700', fontFamily: 'Roboto' }}>Table of Contents (click to expand)</Typography>
        </AccordionSummary>

        <AccordionDetails>

          <Typography>

            {
              productBlog.tableOfContents.map((item, index) => <div key={index} style={{ display: 'flex', flexDirection: 'row' , border:'none' }}  >



                <a href={"#" + item.Heading} onClick={() => { console.log(item.Heading) }} style={Styles.tableItemText} >
                  {item.Heading && ReactHtmlParser(item.Heading.split('h2').join('h4').split('href').join('void'))}
                </a>



                <div style={Styles.tableSubHeadings}>

                  <p href={`#${item.subheading}`} style={{ marginLeft: '25px', fontFamily: "Roboto", color: '#222' }} >
                    {item.subheading && ReactHtmlParser(item.subheading.split('h3').join('p'))}
                  </p>

                </div>
              </div>
              )
            }





          </Typography>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}



const Styles = ({
  Image: {
    width: '55%',
    height: '55%',
    marginLeft: '5%',
    marginBottom: '1%'
  },
  titleContainer: {
    marginLeft: '5%',
    width: '55%',
    marginBottom: '3%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Title: {
    color: 'darkOrange',
  },

  firstParaContainer: {
    width: '70%',
    marginLeft: '5%',
    marginBottom: '5%'

  },
  tableOfContentsContainer: {
    width: '70%',
    height: 'auto',
    marginLeft: '5%',
    overflow: 'hidden',
    boxShadow: '0px 0px 8px 2px lightgray',
    marginBottom: '5%'
  },

  tableOfContentsHeading: {
    width: "100%",
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  tableItemText: {
    font: 'bold italic 14px times new roman',
    marginLeft: '7%',
    marginBottom: '0px',
    color: '#222'
  },
  tableSubHeadings: {
    height: 'auto',
    marginLeft: '15px',
    marginBottom: '25px'
  },
  contentSection: {
    marginLeft: '5%',
  },
  contentHeading: {
    color: 'orange',
  },
  contentPara: {
    width: '70%',
  }
})
