// const addImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ message: "No file uploaded!" });
//         }

//         const filePath = req.file.path; // Path to the uploaded file
//         console.log("File saved at:", filePath);

//         // Simulate saving to a database
//         await saveToDatabase({ filePath });

//         res.status(200).send({
//             message: "File uploaded and saved successfully!",filePath});
        
//     } catch (error) {
//         console.error("Error while uploading file:", error);
//         res.status(500).send({ message: "File upload failed!", error });
//     }
// };
// export default {addImage}
