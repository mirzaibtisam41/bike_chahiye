import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

export default function SelectSmall({ brands, brand, power, setBrand, setPower }) {
    const [variants, setVariants] = React.useState([]);

    const handleChange = (event) => {
        setBrand(event.target.value);
        const filterPower = brands?.find(item => item?.brand === event.target.value);
        setVariants(filterPower?.power);
    };

    return <>
        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="demo-select-small">Select</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={brand}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem disabled value={brand}>Brand/Model</MenuItem>
                {
                    brands?.map(item => {
                        return <MenuItem kay={item?.brand} value={item?.brand}>{item?.brand}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <InputLabel id="demo-select-small">Select</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={power}
                label="Age"
                onChange={(e) => setPower(e.target.value)}
            >
                <MenuItem disabled value={power}>Variant</MenuItem>
                {
                    variants?.map(item => {
                        return <MenuItem kay={item?.power} value={item?.power}>{item?.power}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    </>
}
