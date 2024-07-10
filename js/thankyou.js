const url = 'https://penta-brood-server.vercel.app/success';
// const url = 'http://localhost:3000/success';

addEventListener('DOMContentLoaded', async () => {
    const req = await fetch(url).then(res => res.json());
    console.log(req)
})