import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { auto } from '@popperjs/core';
export default function TextBoxSearch({ width = "40%" }) {
    return (<div style={{ display: 'flex', alignItems: 'center', width:width, height: 40, background: '#0c5273', borderRadius: 25 }}>

        <SearchIcon color='inherit' style={{ fontSize: 20, paddingLeft: 10 }} />
        <input type='text' style={{ width: '70%', height: 26, border: 0, borderWidth: 0, outline: 0, background: 'transparent', color: '#fff', fontSize: 15 }} placeholder='search...' />
        
        <ListIcon color='inherit' style={{ fontSize: 34, paddingLeft: 10, marginLeft: auto, marginRight: 15 }} />
    </div>)
} 