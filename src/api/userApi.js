import axios from 'axios';
// Using Fetch ***********
// export const fetchUsers = () => {
//     return fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('API Failed');
//             }
//             return response.json();
//         });
// };

export const fetchUsers = async () => {
//Using Fetch + async + await *********
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   if (!response.ok) {
//     throw new Error("API failed");
//   }
//   return await response.json();

//this is using axios *******
 const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};

