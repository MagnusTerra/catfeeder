const pool = require('../../../lib/db')

export default async function Lofin(req, res) {
    if (req.method === 'POST') {
        try {
            const {userName, userPassword} = req.body;
            if (!userName || !userPassword) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required Fields'
                })
            }
            // as the same reason we are not encryted the pass, we are not using JWT to login user
            const [user] = await pool.query('SELECT * FROM User WHERE username = ?',
                [userName]
            );

            if (user && user[0].password === userPassword) {
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    user_id: user.user_id
                })
            } else {

                res.status(401).json({
                    success: false,
                    message: 'Invalid credential',
                    password: user.password,
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Serve error: ${error.message}` 
            })
        }
    } else {
        res.status(405).json({
            success: false,
            message: 'Method Not Allowed'
        })
    }
}