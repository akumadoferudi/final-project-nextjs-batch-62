/** eslint-disable */

// type Fetcher = (...args: [string, number]) => Promise<any>;  

// const fetcher: Fetcher = async (url: string, id: number) => {  
//     const response = await fetch(`${url}/${id}`);  
//     return response.json();  
// };

const fetcher = async (url: string, token: string) => {
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return response.json();
    };

export default fetcher;