import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT} on ${new Date().toISOString()}`);
  console.log(`Docs available at http://localhost:5000/docs`);
});
