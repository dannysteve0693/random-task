import React, { useState, useEffect } from 'react';



type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};


function Paginated() {

    const [userList, setUserList] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 3;

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => {

                setUserList(json)

            });
    }

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const totalPages = Math.ceil(userList.length / itemsPerPage);
    const paginated = userList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        fetchUsers()
    }, [currentPage])



    return (
        <div>
            List of User Email


            <table>
                <thead>
                    <th>name</th>
                    <th>email</th>
                </thead>
                <tbody>
                    {paginated?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <div>
                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                <span>Current page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default Paginated;