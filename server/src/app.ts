import express from "express";

import cors from "cors";

import authRoutes from "./routes/authRoutes";

import leadRoutes from "./routes/leadRoutes";

const app = express();




// MIDDLEWARE

app.use(

  cors({

    origin: "*",

    methods: [

      "GET",

      "POST",

      "PUT",

      "DELETE"

    ],

    credentials: true

  })

);




app.use(express.json());




// ROUTES

app.use(

  "/api/auth",

  authRoutes

);




app.use(

  "/api/leads",

  leadRoutes

);




// TEST ROUTE

app.get(

  "/",

  (req, res) => {

    res.send(

      "API Running..."

    );

  }

);




export default app;