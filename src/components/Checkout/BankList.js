import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ payment }) {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {
                payment === 0 ?
                    <>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Meezan Bank</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ textAlign: 'left' }}>
                                <Typography>Account No: 1234567890</Typography>
                                <Typography>IBAN: PK1234567890</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>National Bank</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ textAlign: 'left' }}>
                                <Typography>Account No: 1234567890</Typography>
                                <Typography>IBAN: PK1234567890</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </>
                    :
                    <>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>JazzCash</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ textAlign: 'left' }}>
                                <Typography>Mobile No: 1234567890</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>EasyPaisa</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ textAlign: 'left' }}>
                                <Typography>Mobile No: 1234567890</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </>
            }
        </div>
    );
}