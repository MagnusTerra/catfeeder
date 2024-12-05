const pool = require('../../../lib/db');

export default async function FeedList(req, res) {
  if (req.method === 'GET') {
    try {
      const { request } = req.query;

      if (request === 'types') {
        const [types] = await pool.query(`CALL get_all_feeding_types()`);

        if (types.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'There is any Feeding schedule type'
          });
        }
        res.status(200).json({
          success: true,
          message: types[0]
        });
      }

      const [result] = await pool.query('CALL get_all_feedSchedule');

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No feeding schedules found',
        });
      }

      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      console.error('Error occurred while fetching feeding schedules:', error);

      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { type } = req.body;

      if (type === 'create') {
        const { feedingTime, frequency, foodAmount } = req.body;

        if (!feedingTime || !frequency || !foodAmount) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields: feedingType, frequency, or foodAmount',
          });
        }

        const [feedingResult] = await pool.query(
          `CALL new_feed_schedule(?, ?, ?)`,
          [feedingTime, frequency, foodAmount]
        );

        res.status(200).json({
          success: true,
          message: 'The new feed schedule has been created successfully',
          result: feedingResult,
        });
      } else if (type === 'update') {
        const { id, feedingTime, frequency, foodAmount } = req.body;

        if (!id || !feedingTime || !frequency || !foodAmount) {
          return res.status(400).json({
            success: false,
            message: 'Missing required fields: feedingType, frequency, or foodAmount',
          });
        }

        const [feedingResult] = await pool.query(
          `CALL edit_feeding_Schedule(?, ?, ?, ?)`,
          [id, feedingTime, frequency, foodAmount]
        );

        res.status(200).json({
          success: true,
          message: 'The feed schedule has been updated successfully',
          result: feedingResult,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `An error occurred: ${error.message}`,
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Missing required field: id',
        });
      }

      const [deleteResult] = await pool.query(`CALL delete_feeding_Schedule(?)`, [id]);

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Feeding schedule not found or already deleted',
        });
      }

      res.status(200).json({
        success: true,
        message: 'The feed schedule has been deleted successfully',
        result: deleteResult,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `An error occurred: ${error.message}`,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }
}
