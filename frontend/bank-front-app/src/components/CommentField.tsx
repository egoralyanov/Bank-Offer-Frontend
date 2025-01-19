import './CommentField.css'
import { FC, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa';

interface Props {
    value?: string
    placeholder?: string
    onSubmit: (value: string) => void
}

const CommentField: FC<Props> = ({ value = '', placeholder, onSubmit }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(currentValue);
    };

    return(
        <div className="comment-field">
            <input
                value={currentValue}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <Button variant="outline-primary" onClick={handleSubmit} size="sm">
                <FaCheck/>
            </Button>
        </div>
    );
};

export default CommentField;
