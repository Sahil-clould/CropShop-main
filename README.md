🌾 **CropShop**

CropShop is a web platform designed for wholesale crop trading, connecting sellers and consumers seamlessly. Although still in development, CropShop offers a robust set of features for both sellers and consumers in the agricultural marketplace.

🚀 Deployed Link
https://crop-connect-lime.vercel.app/


🏗️ Architecture
![image](https://github.com/user-attachments/assets/44edd145-2806-4e74-8e18-d71a4d0ee723)

✨ Features
🔁 Dual Interfaces
CropShop provides separate interfaces for consumers and sellers, accessible through the navbar with options for SignUp and SignIn (including email verification).

1)👨‍🌾 Seller Side:

Visualizing Sales Data
Integrated Recharts to display meaningful sales graphs.

2)Product Management:

Add/edit/delete products with images, stock, map location, and minimum order quantities.

3)Order Management:

Access to a dashboard displaying incoming orders and delivery locations via map.

4)FAQ Section:

Answer common buyer queries which get displayed to all consumers.

5)CropSense AI:

Uses Gemini AI to predict suitable crops based on user input.

6)🛒 Consumer Side:

User-Friendly Interface
Browse product categories and listings easily.

7)Product Dashboard:

View product stock, MOQ, and add directly to cart.

8)Review System:

Post and view product reviews to build trust.

9)Contact Farmer Form:

Directly reach out to sellers. Questions answered become part of the FAQ. Map shows location.

10)Dynamic Cart Functionality:

Adjust cart quantities with MOQ/stock limits enforced.

11)Seamless Checkout:

Review order, apply delivery charges, choose location, and checkout smoothly.

12)Real-Time Stock Updates (WebSocket):

Live stock visibility without reloading. (Note: May not work on deployed site due to Vercel limitations; works locally.)

🧰 Technologies Used
1)MongoDB

2)NodeJS

3)ExpressJS

4)ReactJS

5)Redux

6)Tailwind CSS

7)WebSocket (Socket.io)

8)Cloudinary (image storage)

9)Leaflet (map integration)

10)Unsplash (images)

11)Recharts (graph visualization)

12)Gemini AI

12)Other supporting tools/libraries

🛠️ Installation
To run CropShop locally, make sure NodeJS and MongoDB are installed.

📁 Clone the Repository
bash
Copy
Edit
git clone <repository-url>
cd CropShop
🖼️ Frontend Setup
Navigate to the client folder:

bash
Copy
Edit
cd client
Create a .env file and add:

env
Copy
Edit
VITE_CROPSHOP_API="https://cropconnect-backend.vercel.app/"
# For local backend, use: http://localhost:8080/
Run the frontend:

bash
Copy
Edit
npm install
npm run dev
🔧 Backend Setup
Navigate to the server folder:

bash
Copy
Edit
cd ../server
Create a .env file and add the following:

env
Copy

Edit

MONGO_DB_URL={your mongodb url}

GEMINI_API_KEY={your gemini api key}

GMAIL_ID={your gmail id}

APP_PASSWORD={your google app password}

JWT_SECRET={jwt secret}

CLOUDINARY_CLOUD_NAME={cloud name}

CLOUDINARY_API_KEY={cloud api key}

CLOUDINARY_API_SECRET={cloud api secret}

Run the backend:

bash
Copy
Edit
npm install
nodemon
# or

node index.js


🤝 Contribution
CropShop welcomes contributions from the community!
Open issues or submit pull requests to suggest improvements.


⭐ Support
If you find this project helpful, please give it a star ⭐ on GitHub!




