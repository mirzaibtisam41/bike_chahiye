import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function ComboBox({ filterByBrand }) {
    const { brands } = useSelector((state) => state.products);
    const [availableBrands, setAvailableBrands] = React.useState([]);

    React.useEffect(() => {
        const _map = brands?.map(item => {
            return { label: item?.brand }
        });
        setAvailableBrands(_map);
    }, []);

    return (
        <Autocomplete
            style={{ width: '93%' }}
            disablePortal
            id="combo-box-demo"
            options={availableBrands}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Brands" />}
            onChange={(a, v) => filterByBrand(v.label)}
        />
    );
}