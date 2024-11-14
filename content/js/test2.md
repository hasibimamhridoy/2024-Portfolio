---
title: "Test 2"
date: "2024-11-09"
description: "Test 2"
---

# Blog Content Here

# Back-End-Hooks

![449847045_975193454396876_8461100714695199075_n.jpg](Back-End-Hooks%2001b8caa5012e4d94a67fb3a465be3fb3/449847045_975193454396876_8461100714695199075_n.jpg)

- Broiler plate for start express server

  ```jsx
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const jwt = require("jsonwebtoken");
  require("dotenv").config();
  const port = process.env.PORT || 5000;

  // middleware
  app.use(cors());
  app.use(express.json());

  const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@practiceproject.lzr2b0r.mongodb.net/?retryWrites=true&w=majority`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();

      const usersCollection = client.db("finalProject").collection("userData");

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });
  ```

- saveUsers in MongoDB
  এখানে চেক করা হচ্ছে যদি ইউজার থাকে তো অলরেডি ইউজার আছে এটি সেন্ড করা হচ্ছে । না থাকলে নতুন করে ইউজার সেভ করা হচ্ছে।

  ```jsx
  app.post("/users", async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await usersCollection.findOne(query);

    if (existingUser) {
      return res.send({ message: "user already exists" });
    }

    const result = await usersCollection.insertOne(user);
    res.send(result);
  });
  ```

  এটি আরেকভাবেও করা যায়। পুট মেথড ইউজ করেও আমরা এটি করতে পারি।

  ```jsx
  app.put("/users/:email", async (req, res) => {
    const email = req.params.email;
    const user = req.body;

    const query = { email: email };
    const options = { upsert: true };

    const updateDoc = {
      $set: user,
    };

    const result = await usersCollection.updateOne(query, updateDoc, options);
    console.log(result);
    res.status(200).send(result);
  });
  ```

- setAdminRole ( Role Based User)
  **Backend:**

  ```jsx
  app.patch("/users/admin/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        role: "admin",
      },
    };

    const result = await usersCollection.updateOne(filter, updateDoc);
    res.send(result);
  });
  ```

  Front-End**:**
  এটি একটি ফাকশন । যেটার মাধ্যমে আমরা কাউকে এডমিন করে দিতে পারি ।

  ```jsx
  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  ```

- isAdminCheckGetRequest
  **Backend:**

  ```jsx
  // security layer: verifyJWT
  // email same
  // check admin
  app.get("/users/admin/:email", verifyJWT, async (req, res) => {
    const email = req.params.email;

    if (req.decoded.email !== email) {
      res.send({ admin: false });
    }

    const query = { email: email };
    const user = await usersCollection.findOne(query);
    const result = { admin: user?.role === "admin" };
    console.log(result);
    res.send(result);
  });
  ```

  Front-End**:**
  এটি একটি কাস্টম হুক। সেটা এক্সিয়স সিকিউরিটির ভিতর দিয়ে যেয়ে ডাটা গেট করে বলছে এডমিন সত্য না মিথ্যা ।

  ```jsx
  import { useQuery } from "@tanstack/react-query";
  import useAuth from "./useAuth";
  import useAxiosSecure from "./useAxiosSecure";

  const useAdmin = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
      queryKey: ["isAdmin", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        console.log("is admin response", res);
        return res.data.admin;
      },
    });
    return [isAdmin, isAdminLoading];
  };
  export default useAdmin;
  ```

- seeMyCartsItemsGetRequest
  **Backend:**

  ```jsx
  // cart collection apis
  app.get("/carts", verifyJWT, async (req, res) => {
    const email = req.query.email;

    if (!email) {
      res.send([]);
    }

    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      return res.status(403).send({ error: true, message: "porviden access" });
    }

    const query = { email: email };
    const result = await cartCollection.find(query).toArray();
    res.send(result);
  });
  ```

  Front-End**:**
  এটি একটি কাস্টম হুক। সেটা এক্সিয়স সিকিউরিটির ভিতর দিয়ে যেয়ে ডাটা গেট করে বলছে যার কার্ট আইটিম সেই সেটা দেখতে চাচ্ছে কিনা ।

  ```jsx
  import { useQuery } from "@tanstack/react-query";
  import useAxiosSecure from "./useAxiosSecure";
  import useAuth from "./useAuth";
  const useCart = () => {
    const { user, loading } = useAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
      queryKey: ["carts", user?.email],
      enabled: !loading,
      // queryFn: async () => {
      //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
      //         authorization: `bearer ${token}`
      //     }})
      //     return res.json();
      // },
      queryFn: async () => {
        const res = await axiosSecure(`/carts?email=${user?.email}`);
        console.log("res from axios", res);
        return res.data;
      },
    });

    return [cart, refetch];
  };
  export default useCart;
  ```

- Secure Api With Jwt

  - **ধাপ - ০১ (createTokenAndSendToClient)**
    - একটি টোকেন বানিয়ে সেটা ক্লাইন্ট সাইডে সেন্ড করে দিব।
    ```jsx
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    ```
  - **ধাপ - ০২(recieviedTokenAndSetToLocalStorage)**

    - ইউজার যখনি আসবে তখনি এই রাউটে তাকে টোকেন দিয়ে দেইয়া হবে।
    - ইউজার সাথে সাথে সেটা লোকাল / কুকিসে সেভ করে ফেলবে। সাধারণত ফায়ারবেজ ইউজ করলে onAuthStateChanged এর ভিতর আমরা এটা করে থাকি ।

    ```jsx
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("current user", currentUser);

        // get and set token
        if (currentUser) {
          axios
            .post("http://localhost:5000/jwt", { email: currentUser.email })
            .then((data) => {
              // console.log(data.data.token)
              localStorage.setItem("access-token", data.data.token);
              setLoading(false);
            });
        } else {
          localStorage.removeItem("access-token");
        }
      });
      return () => {
        return unsubscribe();
      };
    }, []);
    ```

  - **ধাপ - ০৩(sendTokenToGetSpecificSecureData)**

    - ইউজার যেই সিকিউর রাউটের ডাটা দেখতে চাবে সেটা দেখার জন্য তাকে ওই লোকাল স্টোরেজে সেটা করা টোকেনটা দিতে হবে ।
    - এখানে আমরা দুই সিস্টেমে সেটা দেখতে পাচ্ছি। একটা এডভান্সড ডায়নামিকভাবে টোকেন সেন্ড করছে। আরেকটা যেটা কমেন্ট করা আছে সেটায় মেনুয়ালি আমরা টোকেনটা সেন্ড করছি।
      যেভাবে কাজ করছে ডায়নামিক সিকিউর এক্সিওস কাস্টম হুকটা-[**_এই লিংক থেকে দেখে নিন বিস্তারিত!_**](https://www.notion.so/Front-End-Hooks-b2615a2fd4294d8e9ded581ce0205f26?pvs=21)

    ```jsx
    import { useQuery } from '@tanstack/react-query'
    import useAxiosSecure from './useAxiosSecure';
    import useAuth from './useAuth';
    const useCart = () => {
        const { user, loading } = useAuth();
        // const token = localStorage.getItem('access-token');
        const [axiosSecure] = [useAxiosSecure()](https://www.notion.so/Front-End-Hooks-b2615a2fd4294d8e9ded581ce0205f26?pvs=21);
        const { refetch, data: cart = [] } = useQuery({
            queryKey: ['carts', user?.email],
            enabled: !loading,
            // queryFn: async () => {
            //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
            //         authorization: `bearer ${token}`
            //     }})
            //     return res.json();
            // },
            queryFn: async () => {
                const res = await axiosSecure(`/carts?email=${user?.email}`)
                console.log('res from axios', res)
                return res.data;
            },
        })

        return [cart, refetch]

    }
    export default useCart;
    ```

  - **ধাপ - ০৪(verifyTokenFromServer)**
    কোন রাউটকে প্রোটেক্ট করতে টি দিয়ে ভেরিফাই করতে হবে ।
    যেভাবে কাজ করছেঃ

    - ইউজার যখন এপিইয়াই হিট করছে তখন হেডারসের মধ্যে অথোরাইজেশন টোকেন দিয়েছে কিনা চেক করা হচ্ছে প্রথম ধাপে। যদি না দিয়ে থাকে তাহলে এখন থেকেই বের করে দেয়া হচ্ছে ।
    - টোকেন দিয়ে ভেরিফাই করবো টোকেন ভেলিড কিনা। যদি না হয়ে তাহলে বের করে দিচ্ছি ।
    - আর যদি ভেলিড টোকেন দেয় তাহলে পরবর্তী ধাপ নেক্সট কল করে পাঠিয়ে দিচ্ছি ।

    ```jsx
    const verifyJWT = (req, res, next) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res
          .status(401)
          .send({ error: true, message: "unauthorized access" });
      }
      // bearer token
      const token = authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .send({ error: true, message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    ```

- VerifyJwt MiddleWar

  ```jsx
  const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    // bearer token
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ error: true, message: "unauthorized access" });
      }
      req.decoded = decoded;
      next();
    });
  };
  ```

- VerifyAdmin MiddleWar
  ```jsx
  // Warning: use verifyJWT before using verifyAdmin
  const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    if (user?.role !== "admin") {
      return res
        .status(403)
        .send({ error: true, message: "forbidden message" });
    }
    next();
  };
  ```
