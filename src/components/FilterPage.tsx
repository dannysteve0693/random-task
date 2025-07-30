import  {useState} from 'react';

function FilterPage() {
    const users = [
        { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
        { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
        { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<{ field: string; order: 'asc' | 'desc' }>({ field: '', order: 'asc' });
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortBy.field === 'age') {
            return sortBy.order === 'asc' ? a.age - b.age : b.age - a.age;
        } else if (sortBy.field === 'name') {
            return sortBy.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
    });

    const handleSort = (field: string) => {
        setSortBy(prev => ({
            field,
            order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
        }))
    }

    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
            <input  type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div>
                <button onClick={() => handleSort('age')}>Sort by Age</button>
                <button onClick={() => handleSort('name')}>Sort by Name</button>
            </div>

            <div>
                <h2>Users List</h2>
                <ul>
                    {sortedUsers.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.age} - {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FilterPage;