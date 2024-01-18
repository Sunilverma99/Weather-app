// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// 2. Create an express app and set the port number.
const app=express();
const port=3000;
// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const apiid="c90e081655a8a85bd37cf15f5c7a594e";
app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=una&appid=${apiid}&units=metric`);
      const result = response.data;

      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });
  
  app.post("/", async (req, res) => {

    try {
      const c=req.body.city;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${apiid}&units=metric`);
      const result = response.data;
      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });


app.listen(port,()=>{
    console.log("the server is running on the port 3000")
});