-- Create the users table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255)
);

-- Create the posts table
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    `desc` VARCHAR(5000) NOT NULL,
    img VARCHAR(255) NOT NULL,
    date DATETIME,
    category VARCHAR(45) NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(id)
);

-- Create the drafts table
CREATE TABLE drafts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500),
    `desc` VARCHAR(5000),
    img VARCHAR(255),
    category VARCHAR(45),
    uid INT NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(id)
);

-- Add some dummy data to the users table
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_doe', 'jane@example.com', 'password456');

-- Add some dummy data to the posts table ( Note: make sure to add valid img links in the img column ) 
INSERT INTO posts (title, description, img, date, category, uid) VALUES
('First Post', 'This is the description of the first post.', 'post1.jpg', NOW(), 'Category1', 1),
('Second Post', 'This is the description of the second post.', 'post2.jpg', NOW(), 'Category2', 2);

-- Add some dummy data to the drafts table ( Note: make sure to add valid img links in the img column ) 
INSERT INTO drafts (title, description, img, category, uid) VALUES
('Draft Post 1', 'This is the description of the first draft.', 'draft1.jpg', 'Category1', 1),
('Draft Post 2', 'This is the description of the second draft.', 'draft2.jpg', 'Category2', 2);

-- Adjust the dummy data as needed.