const express = require('express'); 
const app = express(); 

const port = process.env.PORT || 8228;

app.get("/", (req, res) => {
    res.send("hola");
    console.log("ESTABLISHED SERVER");
});

// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});