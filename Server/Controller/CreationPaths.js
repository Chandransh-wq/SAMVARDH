// controllers/exampleController.js

// This handles the GET /hello request
const sayHello = (req, res) => {
  res.json({ message: "Hello from controller!" });
};

const sayBye = (req, res) => {
    res.json({ message: "Bye from backend" })
}


export { sayHello, sayBye }