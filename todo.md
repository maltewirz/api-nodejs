# Piloteers Challenge

1. Understand the problem	
   1. Input: File in JSON format. Filename describes location, latitude, longitude, additional data
   2. Output:  2 API endpoints : 
      1. Listing all location names
      2. Details of location: Name, Latitude, Longitude, additional data, calculated beeline distance to lat: 52.502931, lng: 13.408249
   3. Hosting: AWS Lambda

2. Explore Examples

   Input:

   Berlin.json 

   1. ```js
      {
        "latitude": "52.514818",
        "longitude": "13.356101",
        "additionalData": "xyc"
      }
      ```

      Paris.json

      ```js
      {
        "latitude": "48.885347",
        "longitude": "2.358850",
        "additionalData": "123"
      }
      ```

   Output:

   ​	Query to `/api/location/names/`

   ```js
   {["Berlin"], ["Paris"]}	
   ```

   Query to `/api/location/details/berlin` 

   ```js
   {
     "name": "Berlin",
     "latitude": "52.514818",
     "longitude": "13.356101",
     "additionalData": "xyc",
     "distance_office": "4 KM"
   }
   ```

   

3. Break it down:
   1. Set up NodeJS Server
   2. Set-up PostGres SQL Database
   3. Test API POST Call with File
   4. Read File and parse Filename and its contents and save to DB
      1. Handle empty inputs
      2. Handle invalid inputs
      3. Calculate each distance to office
   5. Test API GET Call
   6. API GET: send details of location
   7. Document and Comment