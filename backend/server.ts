import express, { response } from "express";
import cors from "cors"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/auth/register", async (request, response) => {
    //console.log(request.body)
    
    response.send(request.body)
})

app.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})