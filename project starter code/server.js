import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get("/filteredimage", async (req,res ) => {

    let imageUrl = req.query.image_url;
    if ( !imageUrl ) {
      // 1. validate the image_url query
      return res.status(400).send(`imageUrl is required`);
    }
    var files = [];
    var isError = false;
    // 2. call filterImageFromURL(image_url) to filter the image
    await filterImageFromURL(imageUrl)
      .then(fileData => {
        // 3. send the resulting file in the response
        res.sendFile(fileData);
        files.push(fileData);
      })
      .catch(err => isError = true);

    setTimeout(() => {
      if (files && files.length && !isError) {
        // 4. deletes any files on the server on finish of the response
        deleteLocalFiles(files);
      }
    }, 1000);
  } );
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
