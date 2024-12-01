-- Initialize Database Schema

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'posts' table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,   -- URL to picture
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create 'comments' table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,    -- Links comment to a specific post
    user_id INT,             -- Links comment to the user who made it
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert default 'admin' user
INSERT INTO users (username, password, isAdmin)
VALUES ('admin', 'adminpass', true);

-- Insert additional users for comments
INSERT INTO users (username, password)
VALUES ('catEnjoyer', '1234'), ('catLover', 'cats'), ('catEnthusiast', 'password');

-- Insert sample posts
INSERT INTO posts (title, content, user_id)
VALUES 
    -- Random cat photos 
    ('A grumpy cat', 'https://cdn2.thecatapi.com/images/ck4.jpg', 2),
    ('My Princess', 'https://cdn2.thecatapi.com/images/MjA3NDI1MQ.jpg', 3),
    ('A cute cat', 'https://cdn2.thecatapi.com/images/djnExlK9y.jpg', 4);

-- Insert comments for multiple posts
INSERT INTO comments (post_id, user_id, content)
VALUES 
    (1, 1, 'Great post by catEnjoyer!'),
    (1, 2, 'Interesting thoughts!'),
    (1, 3, 'Looking forward to more content.'),
    (2, 1, 'Nice picture, admin!'),
    (2, 2, 'This post is amazing!'),
    (3, 3, 'Really cool picture!');
