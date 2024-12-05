const pool = require('../../../lib/db')

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Get a connection from the pool
        const [rows] = await pool.query('SELECT * FROM User');
        res.status(200).json({ success: true, data: rows });
      } catch (error) {
        console.error('Database query error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    } else if (req.method === 'POST') {
        try{
            const {userName, userPassword, userEmail} = req.body;
            // we are not encryted the password, Why?, its so late and im sleepy
            if (!userName || !userPassword || !userEmail) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                })
            } 

            const [result] = await pool.query(
                `CALL create_user(?, ?, ?)`,
                [userName, userPassword, userEmail]
            );
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user_id: result.insertId
            })
        } catch (error) {
            console.error('Error creating user:', error.message)
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    } 
    
    else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }