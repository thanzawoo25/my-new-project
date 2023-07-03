import { Box, Button, Chip, TextField } from "@mui/material";
import Layout from "./Layout"
import { useState } from "react";
import FileDropzone from "./FileDropzone";
import { config } from "../Config/config";
console.log(config)

const CreateMenu = () => {
    const [newMenu, setNewMenu] = useState({ name: "", description: "", price: 0,assetUrl:"" });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const onFileSelected = (selectedFiles: File[]) => {
        console.log("hello",selectedFiles)
        setSelectedFiles(selectedFiles)
    }
    

    const createNewMenu = async() => {
        console.log("Create new menu", newMenu)
        const isValid = newMenu.name && newMenu.description;
        
        if(!isValid) return console.log("Name and description required..")
        const accessToken = localStorage.getItem("accessToken")
        if (selectedFiles.length) {
            const formData = new FormData();
        formData.append("file", selectedFiles[0])
        const response = await fetch(`${config.apiBaseUrl}/assets`, {
            method: "POST",
            body: formData
        });
        const responseData = await response.json();
        newMenu.assetUrl = responseData.assetUrl;
        }
        const response = await fetch(`${config.apiBaseUrl}/menus`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newMenu)
        })
    }

    
    return (
        <Layout title="Create Menu">
            <Box sx={{display:"flex",flexDirection:"column",width:"500px",margin:"0 auto"}}>
                <h1>Create Menu</h1>
                <TextField 
                    placeholder="name"
                    onChange={(event) => setNewMenu({...newMenu,name:event.target.value})}
                    sx={{ mb: 2 }}
                />
                <TextField sx={{ mb: 2 }}
                    placeholder="description"
                    onChange={(event)=>setNewMenu({...newMenu,description:event.target.value})}
                />
                <TextField sx={{ mb: 2 }}
                    type="number"
                    placeholder="price"
                    onChange={(event)=>setNewMenu({...newMenu,price:Number(event.target.value)})}
                />
                <Box sx={{mb:3}}>
                    <FileDropzone onFileSelected={onFileSelected} />
                    <Box sx={{mt:2}}>
                        {selectedFiles.map((file) => {
                            return (
                                <Chip
                                    sx={{mb:2}}
                                    key={file.name}
                                    label={file.name}
                                    onDelete={() => {
                                        const filteredSelectFiles = selectedFiles.filter(
                                            (selectedFile)=> selectedFile.name !== file.name
                                        )
                                        setSelectedFiles(filteredSelectFiles)
                                    }}
                                />
                            )
                        })}
                    </Box>
                </Box>
                <Button variant="contained" sx={{ width: "fit-content", display: "flex",margin: "0 auto" }}
                    onClick={createNewMenu}
                >
                    Create menu
                </Button>
            </Box>    
        </Layout>
    )
}
export default CreateMenu;