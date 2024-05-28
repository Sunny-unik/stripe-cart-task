<div align="center">

# stripe-cart-task

> A Web App for list products and payment gateway via cart

</div>

## Tech Stack

- Node/Express for server
- React for frontend
- Mongodb for database
- Stripe for payments

## Prerequisites

- Node & npm installed on your machine
- MongoDB instance running on your local machine
- Stripe account with test business setup & configure a customer from [test dashboard](https://dashboard.stripe.com/test/customers)

## Project Setup

**- Frontend**

1. Open terminal and goto client directory run `npm i` for install dependencies
2. Copy **.env.example** & paste on same location with a new name **.env**
3. Update env inside **.env** file with your actual envs
4. Now run `npm run dev` it will serve frontend on [http://localhost:5173]

**- Backend**

1. Open another terminal and goto server directory run `npm i` for install dependencies
2. Copy **.env.example** & paste on same location with a new name **.env**
3. Update env inside **.env** file with your actual envs
4. Import [Products data](/server/db/products.json) in products collection inside mongo database
5. Now run `npm run dev` it will serve backend routes on [http://localhost:4000]
