import { FC } from 'react'
import './SearchField.css'

interface Props {
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const SearchField: FC<Props> = ({ value, setValue, placeholder }) => (
    <div className="searchField">
        <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
    </div>
)

export default SearchField
