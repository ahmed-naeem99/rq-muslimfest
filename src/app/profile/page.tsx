import React from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    // cache: "no-store" = no caching
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();

  return <div className="dark:text-white">ProfilePage</div>;

  // return (
  //   <>
  //     <h1>Users</h1>
  //     {/* Static vs. Dynamic Rendering */}
  //     {/* <p> {new Date().toLocaleTimeString()}</p> */}
  //     <table className="table table-bordered" style={{ position: "static" }}>
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Email</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <td>{user.name}</td>
  //             <td>{user.email}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </>
  // );
};

export default UsersPage;
