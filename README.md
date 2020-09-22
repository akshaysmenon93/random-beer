# RANDOM BEER APP

This project is built using the following technologies :

- ReactJS
- Redux
- Material UI
- [Brewery DB] (https://www.brewerydb.com/developers) open API for developers

## Running

1. Make sure you have [nodejs](https://nodejs.org//) and [npm](https://www.npmjs.com/) installed
2. Clone the project
3. Navigate to root folder and install the dependencies
   ```bash
   npm install
   ```
4. Copy the file '.env.example' into '.env'
   ```bash
   cp .env.example .env
   ```
5. Edit the '.env' file to add the API key in the REACT_APP_KEY variable(IMPORTANT)

6. Build the React app by using

   ```bash
   npm run build
   ```

7. If you do not have a static server installed, install it using

   ```bash
   npm install -g serve
   ```

8. Run the build using
   ```bash
   serve -s build
   ```
9. Access the application using the local URL displayed

10. Enjoy the App !

## License

[ISC](https://choosealicense.com/licenses/isc/)
