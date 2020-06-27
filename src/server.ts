import express, { request } from 'express';

const app = express ();
app.get('/', (request, response) => {
  return response.json({message: 'hello wgiovanna'});
})

app.listen(3333, () =>{
  console.log('Servidor iniciado :sunglasses: ')
})