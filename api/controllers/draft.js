import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getDraft = (req, res) => {

    const q = "SELECT d.id, `username`, `title`, `desc`, d.img, u.img AS userImg, `category` FROM users u JOIN drafts d ON u.id=d.uid WHERE d.uid = ?";
        
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
};


export const addDraft = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "INSERT INTO drafts(`title`, `desc`, `img`, `category`, `uid`) VALUES (?)";

        const values = [
            req.body.title || null,
            req.body.desc || null,
            req.body.img || null,
            req.body.category || null,
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Draft added!");
        });
    });
};

export const deleteDraft = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const q = "DELETE FROM drafts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your own drafts!");
        
            return res.status(200).json("Draft deleted!");
        });
    });
};

export const updateDraft = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Unauthorized!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token!");

        const draftId = req.params.id;
        const q = "UPDATE drafts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE `id` = ? AND `uid` = ?";

        const values = [
            req.body.title || null,
            req.body.desc || null,
            req.body.img || null,
            req.body.category || null,
        ];

        db.query(q, [...values, draftId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Draft updated!");
        });
    });
};
