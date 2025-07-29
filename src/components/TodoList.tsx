import { useState } from 'react';

function TodoList() {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const onAddItem = () => {
        setItems(prevItems => [...prevItems, inputValue]);
        setInputValue('');
    }

    const onDeleteItem = (index: number) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    return (
        <>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => onAddItem()}>Add</button>

            <div>
                <ul>
                    {
                        items.map((item, index) => {
                            return (
                                <li key={index}>{item} <button onClick={() => onDeleteItem(index)}>delete</button></li>
                            )
                        })
                    }
                </ul>
            </div>

        </>
    );
}

export default TodoList;