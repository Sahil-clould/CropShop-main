**CropShop**

CropShop is a web platform designed for wholesale crop trading, connecting sellers and consumers seamlessly. Although still in development, CropShop offers a robust set of features for both sellers and consumers in the agricultural marketplace.

Deployed Link
https://crop-connect-lime.vercel.app/

Architecture


Features
Dual Interfaces: CropShop provides separate interfaces for consumers and sellers, accessible through the navbar with options for SignUp and SignIn including email verification for the created account.

Seller Side

Visualizing Sales Data: Incorporated Recharts (graphs) into the project, which has allowed to create insightful visualisations of sales data.

Product Management: Sellers can easily add products, including images, details, location via map selection, current stocks, minimum order quantity restrictions, etc. which can be edited and deleted further.

Order Management: Sellers have access to a dashboard displaying order requests, including order location coordinates on a map.

FAQ Section: Sellers can address common inquiries about their products through a dedicated FAQ section visible to consumers.

CropSense AI: Powered by Gemini AI, used to predict the crops according to the given parameters.

Consumer Side

User-Friendly Consumer Interface: Consumers can browse various categories and products conveniently from the homepage.

Detailed Product Dashboard: Product details, including stock availability and minimum order quantity, are displayed prominently. Users can add products to their cart directly from the dashboard.

Review System: Users can leave reviews for products, enhancing transparency and trust.

Contact Farmer Form: A contact form allows users to inquire about products directly, with answered queries becoming part of the FAQ section. It also has a map which shows the product location.

Dynamic Cart Functionality: Users can manage product quantities in the cart, with limitations based on minimum order quantities and available stock.

Seamless Checkout: The checkout process allows users to review orders, including delivery charges, select delivery locations, and place orders securely.

Real-Time Stock Updates (WebSocket): Implemented WebSocket functionality to provide real-time stock updates. Users can see live changes in stock availability without needing to reload the page. Please note that this feature may not be visible on the deployed website (deployed on Vercel) as Vercel does not support WebSocket connections. However, if the project is run locally, real-time updates can be seen.

Technologies Used
MongoDB

NodeJS

ExpressJS

ReactJS

Redux

Tailwind CSS

WebSocket (socket.io)

Cloudinary (for image storage)

Leaflet (for map)

Unsplash (for images)

Recharts (for graphs)

Gemini AI

Other supporting technologies

Installation
To run CropShop locally, ensure you have NodeJS and MongoDB installed. Follow these steps:

Clone the repository:

bash
Copy
Edit
git clone <repository-url>
cd CropShop
Frontend Setup:

Navigate to the CropShop client folder.

Create a .env file in the root directory of the client folder.

Add the following environment variables to the client .env file:

plaintext
Copy
Edit
VITE_CROPSHOP_API = "https://cropconnect-backend.vercel.app/" 
# Replace if you want to run the Backend local server to http://localhost:8080/
To run the Frontend:

bash
Copy
Edit
cd client
npm run dev
Backend Setup:

Navigate to the CropShop server folder.

Create a .env file in the root directory of the server folder.

Add the following environment variables to the server .env file:

plaintext
Copy
Edit
MONGO_DB_URL = {your mongodb url}
GEMINI_API_KEY = {your gemini api key}
GMAIL_ID = {your gmail id}
APP_PASSWORD = {your google account app password}
JWT_SECRET = {jwt secret}
CLOUDINARY_CLOUD_NAME = {cloudinary cloud name}
CLOUDINARY_API_KEY = {cloudinary api key}
CLOUDINARY_API_SECRET = {cloudinary api secret}
To run the Backend:

bash
Copy
Edit
# Use nodemon for automatic server restarts upon file changes
nodemon
# or
# Run the server with NodeJS
node index.js
By following these steps, you'll have the CropShop application running locally on your machine. Adjust configurations as needed for your development environment.

Contribution
CropShop welcomes contributions from the community. Feel free to open issues or submit pull requests to help improve the platform.

If you find this project helpful, we'd appreciate it if you could give it a star ⭐.

