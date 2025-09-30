// controllers/exampleController.js

// This handles the GET /hello request
export const sayHello = (req, res) => {
  res.json({ message: "Hello from controller!" });
};

export const sayBye = (req, res) => {
    res.json({ message: "Bye from backend" })
}