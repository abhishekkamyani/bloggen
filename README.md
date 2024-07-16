# Bloggen

Bloggen is a modern blogging platform developed by Abhishek Kamyani where users can create accounts, manage their profiles, write and share blogs, and interact with other users' content. All images will be saved in AWS cloud. This README provides an overview of the platform's features, setup instructions, and other relevant details.

## Features

### User Accounts

- **Account Creation/Login:** Users can create new accounts and log in to existing ones.
- **Profile Management:** Users can view and update their profile, including their name, bio, country, social media links, profile photo/avatar, and cover photo (email cannot be changed).
- **Account Settings:** Users have access to settings where they can modify any field except their email address.

### Blogging

- **Blog Creation:** Users can write and upload blogs with the following elements:
  - **Title:** The blog's main heading.
  - **Summary:** A brief overview of the blog.
  - **Cover Image:** An image representing the blog.
  - **Description:** Rich-text content including headings, links, quotes, block codes, and images.
  - **Categories:** Users can select between one and three categories for their blog.

### Interactions

- **Profile Viewing:** Users can view each other’s profiles and see their details and blogs.
- **Blog Viewing and Liking:** Users can read and like blogs posted by others.
- **Homepage:** A feed of blogs with filtering options by category.
- **Pagination:** Users can navigate through pages of blogs and control the number of blogs displayed per page.
- **Liked Posts:** Users can view a list of posts they have liked.
- **Uploaded Posts:** Users can see their own uploaded posts.

### Contact Us

- **Contact Form:** A form for users to send their name, email, and message, which will be emailed directly to the owner/developer.

## Directories

### Client

This directory contains the frontend code for Bloggen.

#### Libraries Used

1. **react:** The core library for building the user interface.
2. **react-dom:** For rendering React components to the DOM.
3. **react-router-dom:** For handling routing in the application.
4. **@tanstack/react-query:** For data fetching and caching.
5. **axios:** For making HTTP requests to the backend server.
6. **primereact:** A UI component library for React.
7. **react-quill:** For integrating a rich-text editor.
8. **react-helmet-async:** For managing changes to the document head.
9. **react-icons:** For including icons in the application.
10. **react-toastify:** For displaying toast notifications.
11. **react-top-loading-bar:** For showing a loading bar at the top of the page.
12. **date-fns:** For manipulating and formatting dates.
13. **tw-elements:** For additional UI components based on Tailwind CSS.

#### Development Tools

1. **vite:** A fast build tool and development server.
2. **tailwindcss:** A utility-first CSS framework.

### Server

This directory contains the backend code for Bloggen.

#### Libraries Used

1. **express:** A web framework for Node.js.
2. **mongoose:** For working with MongoDB.
3. **jsonwebtoken:** For creating and verifying JSON Web Tokens.
4. **bcryptjs:** For hashing passwords.
5. **cors:** Middleware for enabling Cross-Origin Resource Sharing.
6. **body-parser:** Middleware for parsing request bodies.
7. **cookie-parser:** Middleware for parsing cookies.
8. **dotenv:** For loading environment variables from a `.env` file.
9. **@aws-sdk/client-s3:** For interacting with AWS S3.
10. **@aws-sdk/lib-storage:** AWS S3 library for managing file uploads.
11. **multer:** For handling file uploads.
12. **multer-s3:** Multer storage engine for AWS S3.
13. **slugify:** For generating URL-friendly slugs.

#### Development Tools

1. **nodemon:** A tool for automatically restarting the server during development.

## Setup Instructions

### Prerequisites

- **Node.js**
- **MongoDB**
- **NPM/Yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bloggen.git
   cd bloggen
   ```

2. **Install dependencies in the both directories:**
   ```bash
   npm install
   ```

3. **Configure environment variables in the server directory:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=eu-your_aws_region
   AWS_BUCKET_NAME=your_aws_bucket_name
   ```

4. **Run the development server of both directories:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

### Deployment

To deploy the application to a production environment, follow these steps:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the build files to your server:**
   Use your preferred deployment method (e.g., uploading files via FTP, using a CI/CD pipeline, etc.).

## Contributing

We welcome contributions from the community. To contribute:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or support, please reach out to:

- **Abhishek Kamyani**
  - **Phone:** +92-333-730-3712
  - **Email:** [abhishekkamyani@gmail.com](mailto:abhishekkamyani@gmail.com)
  - **Portfolio:** [abhishek-kamyani.vercel.app](http://abhishek-kamyani.vercel.app/)
  - **LinkedIn:** [linkedin.com/in/abhishekkamyani](https://www.linkedin.com/in/abhishekkamyani/)

---

Thank you for using Bloggen! We hope you enjoy creating and sharing your content.
