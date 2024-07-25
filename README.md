
# Blog App

In an age where sharing ideas, stories, and experiences online has become second nature, having a dedicated platform to manage and publish blog posts is invaluable. This blog app provides a straightforward and efficient way to create, read, update, and delete blog posts, making it easy for anyone to maintain their online presence.




## Table of Contents

- [Screenshots](#Screenshots)
- [Features](#Features)
- [Setup Instructions](#Setup-Instructions)
- [Learning Journey](#Learning-Journey)
- [Future Enhancements](#Future-Enhancements)

<a id="Screenshots"></a>
## Screenshots

![Login](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Login.png)

![Register](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Register.png)

![Home(1)](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Home(1).png)

![Home(2)](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Home(2).png)

![Single](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Single.png)

![Write](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Write.png)

![Edit](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Edit.png)

![Profile](https://github.com/RadithSandeepa/blog-app/blob/main/photos/Profile.png)

<a id="Features"></a>
## Features


- Create Posts: Easily compose and publish new blog posts with a rich text editor.
- Read Posts: Browse through all published blog posts, with options to filter by categories.
- Update Posts: Edit and update existing blog posts to keep content fresh and relevant.
- Delete Posts: Remove blog posts that are no longer needed with a simple action.
- Draft Posts: Save posts as drafts if you're not ready to publish them right away.
- Profile Management: Edit your personal information and change your password on your profile page.
- Route Protection: Access control to ensure users can only edit or delete their own posts.

<a id="Setup-Instructions"></a>
## Setup Instructions

 1.Clone the repository:

```bash
 git clone https://github.com/RadithSandeepa/blog-app.git
```


 2.Navigate to the project directory:
 ```bash
  cd blog-app
```

 3.Install dependencies:
 ```bash
  cd api
  npm install
```
```bash
 cd client
 npm install
```
 4.Set up MySQL database:
 - Create a MySQL database for the project.
 - Copy the .env.example file and rename it to .env.
 - Open the .env file and fill in the necessary data:
```bash
  DB_HOST=your_mysql_host
  DB_USER=your_mysql_username
  DB_PASSWORD=your_mysql_password
  DB_DATABASE=your_database_name
```
Replace your_mysql_host, your_mysql_username, your_mysql_password, and your_database_name with your MySQL database connection details.

 5.Import the provided SQL file (blog_app.sql) into your MySQL database to create the necessary tables and data.

 6.Start the server:
 ```bash
  npm start
```
7.Open your preferred web browser and navigate to http://localhost:3000 to access the Simple Book Manager.

<a id="Learning-Journey"></a>
## Learning Journey

Working on this blog app has been an enriching experience. Here are some of the key learnings:

- React-Quill: Integrated a rich text editor for creating and editing blog posts, providing a user-friendly interface for content creation.
- Multer: Implemented file uploads to handle images and other media attachments in blog posts.

<a id="Future-Enhancements"></a>
## Future Enhancements

- Commenting System: Adding a feature for readers to leave comments on blog posts, fostering community interaction.

- Mobile Responsiveness: Ensuring the application is fully responsive and optimized for mobile devices.

Thank you for exploring my blog app project. Stay tuned for more updates as I continue to enhance its features and capabilities!

Happy blogging!✒️📝


