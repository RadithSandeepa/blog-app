import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "SELECT `img`, `username`, `email` FROM users WHERE id = ?";
        
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length === 0) return res.status(404).json("User not found!");
            return res.status(200).json(data[0]);
        });
    });
};

export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "DELETE FROM users WHERE id = ?";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            
            if (data.affectedRows === 0) return res.status(404).json("User not found!");
            return res.status(200).json("User deleted successfully!");
        });
    });
};

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const { username, email, img } = req.body;

        if (!username || !email) {
            return res.status(400).json("Username and email are required!");
        }

        const q = "UPDATE users SET `username` = ?, `email` = ?, `img` = ? WHERE id = ?";
        
        const values = [
            username,
            email,
            img || null // Allow img to be nullable
        ];

        db.query(q, [...values, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(404).json("User not found!");
            return res.status(200).json("User updated successfully!");
        });
    });
};